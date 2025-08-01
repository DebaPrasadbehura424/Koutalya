package com.KoutalayaAdminEmp.controller;

import com.KoutalayaAdminEmp.services.StudentService;
import com.KoutalayaAdminEmp.model.StudentModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

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
}
