package com.KoutalayaAdminEmp.controller;

import com.KoutalayaAdminEmp.services.StudentService;
import com.KoutalayaAdminEmp.utils.TransactionData;
import com.KoutalayaAdminEmp.model.FeesModel;
import com.KoutalayaAdminEmp.model.StudentModel;
import com.KoutalayaAdminEmp.repository.FeesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;
    @Autowired
    private FeesRepository feesRepository;

    @PostMapping("/register")
    public StudentModel registerStudent(@RequestBody StudentModel studentModel) {
        return studentService.registerStudent(studentModel);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody StudentModel studentModel) {
        return studentService.loginStudent(studentModel);
    }

    @GetMapping("/all")
    public List<StudentModel> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/{id}")
    public Optional<StudentModel> getStudent(@PathVariable String id) {
        return studentService.getStudentById(id);
    }

    @PutMapping("/update/{id}")
    public StudentModel updateStudent(@PathVariable String id, @RequestBody StudentModel student) {
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable String id) {
        studentService.deleteStudent(id);
        return "Student with ID " + id + " deleted successfully!";
    }

    @GetMapping("/fees/{id}")
    public ResponseEntity<?> getStudentFees(@PathVariable String id) {
        try {
            Optional<StudentModel> studentModel = studentService.getStudentById(id);

            if (studentModel.isPresent()) {
                FeesModel feesModel = studentModel.get().getFeesModel();
                return ResponseEntity.ok(feesModel);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student not found with ID: " + id);
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching fees: " + e.getMessage());
        }
    }

    @PutMapping("/fees/pay/{feesId}/{payFor}/{mode}")
    public ResponseEntity<?> partialPay(
            @PathVariable String feesId,
            @PathVariable String payFor,
            @PathVariable String mode,
            @RequestBody TransactionData data) {
        Optional<FeesModel> opt = feesRepository.findById(feesId);
        if (!opt.isPresent())
            return ResponseEntity.notFound().build();
        FeesModel fees = opt.get();

        int course = Integer.parseInt(fees.getCourseDues());
        int hostel = Integer.parseInt(fees.getHostelDues());
        int fine = Integer.parseInt(fees.getFine());
        int total = Integer.parseInt(fees.getTotalDues());

        int amt = Integer.parseInt(data.getAmountPaid());

        int currentPart = payFor.equals("course") ? course : payFor.equals("hostel") ? hostel : fine;

        if (amt > currentPart) {
            return ResponseEntity
                    .badRequest()
                    .body("Payment exceeds remaining " + payFor + " dues");
        }

        if (payFor.equals("course"))
            course -= amt;
        else if (payFor.equals("hostel"))
            hostel -= amt;
        else
            fine -= amt;

        total = course + hostel + fine;
        fees.setCourseDues(String.valueOf(course));
        fees.setHostelDues(String.valueOf(hostel));
        fees.setFine(String.valueOf(fine));
        fees.setTotalDues(String.valueOf(total));

        // Determine status
        data.setStatus(total <= 0 ? "Paid" : "Pending");
        data.setMode(mode);
        data.setTrasanctionDate(
                new SimpleDateFormat("yyyy‑MM‑dd").format(new Date()));

        fees.getTransactionData().add(data);
        feesRepository.save(fees);
        return ResponseEntity.ok(fees);
    }

}
