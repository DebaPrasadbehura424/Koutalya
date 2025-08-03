package com.KoutalayaAdminEmp.controller;

import com.KoutalayaAdminEmp.model.EmpTimeTableModel;
import com.KoutalayaAdminEmp.model.EmployeeModel;
import com.KoutalayaAdminEmp.repository.EmployeeRepository;
import com.KoutalayaAdminEmp.repository.EmployeeTimeTableRepository;
import com.KoutalayaAdminEmp.services.EmployeeServices;
import com.KoutalayaAdminEmp.utils.DaySchedule;
import com.KoutalayaAdminEmp.utils.TimeSlot;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emps")
public class EmployeeController {

    @Autowired
    private EmployeeServices employeeServices;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeTimeTableRepository empTimeTableRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody EmployeeModel emp) {
        try {
            EmployeeModel savedEmp = employeeServices.registerEmployee(emp);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedEmp);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error during registration: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String password) {
        try {
            EmployeeModel emp = employeeServices.login(email, password);
            return ResponseEntity.ok(emp);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Login error: " + e.getMessage());
        }
    }

    @DeleteMapping("/deleteEmployee")
    public ResponseEntity<?> deleteEmployee(@RequestParam String email) {
        EmployeeModel emp = employeeRepository.findByEmail(email);

        if (emp == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found.");
        }
        if (emp.getTimeTable() != null && emp.getTimeTable().getId() != null) {
            empTimeTableRepository.deleteById(emp.getTimeTable().getId());
        }
        employeeRepository.deleteByEmail(email);
        return ResponseEntity.ok("Employee and timetable deleted successfully.");
    }

    @PutMapping("/editEmployee/{email}")
    public ResponseEntity<?> editEmployee(
            @PathVariable String email,
            @RequestBody EmployeeModel updatedEmployee) {

        EmployeeModel existingEmp = employeeRepository.findByEmail(email);

        if (existingEmp == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found.");
        }

        existingEmp.setEmpName(updatedEmployee.getEmpName());
        existingEmp.setPhoneNumber(updatedEmployee.getPhoneNumber());
        existingEmp.setEmpPhoto(updatedEmployee.getEmpPhoto());
        existingEmp.setSalary(updatedEmployee.getSalary());
        existingEmp.setCourseType(updatedEmployee.getCourseType());
        existingEmp.setBranch(updatedEmployee.getBranch());
        existingEmp.setWorkInformation(updatedEmployee.getWorkInformation());

        employeeRepository.save(existingEmp);

        return ResponseEntity.ok("Employee updated successfully.");
    }

    @GetMapping("/getEmployee")
    public ResponseEntity<?> getEmployee() {
        try {
            List<EmployeeModel> emp = employeeServices.getAllEmployee();
            return ResponseEntity.ok(emp);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("error: " + e.getMessage());
        }
    }

    @GetMapping("/getEmployeeByEmail/{email}")
    public ResponseEntity<?> getEmployeeByEncryptedEmail(@PathVariable String email) {
        try {
            System.out.println("Decrypted Email: " + email);

            EmployeeModel emp = employeeServices.findByEmail(email);
            if (emp == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
            }
            return ResponseEntity.ok(emp);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Decryption Error: " + e.getMessage());
        }
    }

    @PatchMapping("/add-slot")
    public ResponseEntity<?> addSlotToDay(
            @RequestBody TimeSlot slot,
            @RequestParam String email,
            @RequestParam String daysName) {
        EmployeeModel emp = employeeRepository.findByEmail(email);
        if (emp == null || emp.getTimeTable() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee or timetable not found.");
        }

        EmpTimeTableModel timeTable = emp.getTimeTable();
        boolean updated = false;

        for (DaySchedule day : timeTable.getWeeklySchedule()) {
            if (day.getDay().equalsIgnoreCase(daysName)) {
                TimeSlot newSlot = new TimeSlot();

                newSlot.setSubject(slot.getSubject());
                newSlot.setStartTime(slot.getStartTime());
                newSlot.setEndTime(slot.getEndTime());
                newSlot.setRoomNo(slot.getRoomNo());
                newSlot.setCourseType(slot.getCourseType());
                newSlot.setSection(slot.getSection());

                day.getSlots().add(newSlot);
                updated = true;
                break;
            }
        }

        if (!updated) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid day name.");
        }

        empTimeTableRepository.save(timeTable);
        return ResponseEntity.ok("Slot added successfully to " + daysName);
    }

    @PatchMapping("/edit-slot")
    public ResponseEntity<?> editSlotInDay(
            @RequestBody TimeSlot updatedSlot,
            @RequestParam String email,
            @RequestParam String daysName,
            @RequestParam int slotIndex) {
        EmployeeModel emp = employeeRepository.findByEmail(email);
        if (emp == null || emp.getTimeTable() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee or timetable not found.");
        }

        EmpTimeTableModel timeTable = emp.getTimeTable();
        boolean updated = false;

        for (DaySchedule day : timeTable.getWeeklySchedule()) {
            if (day.getDay().equalsIgnoreCase(daysName)) {
                List<TimeSlot> slots = day.getSlots();

                if (slotIndex < 0 || slotIndex >= slots.size()) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid slot index.");
                }

                TimeSlot slot = slots.get(slotIndex);
                slot.setSubject(updatedSlot.getSubject());
                slot.setStartTime(updatedSlot.getStartTime());
                slot.setEndTime(updatedSlot.getEndTime());
                slot.setRoomNo(updatedSlot.getRoomNo());
                slot.setCourseType(updatedSlot.getCourseType());
                slot.setSection(updatedSlot.getSection());

                updated = true;
                break;
            }
        }

        if (!updated) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid day name.");
        }

        empTimeTableRepository.save(timeTable);
        return ResponseEntity.ok("Slot updated successfully in " + daysName);
    }

}
