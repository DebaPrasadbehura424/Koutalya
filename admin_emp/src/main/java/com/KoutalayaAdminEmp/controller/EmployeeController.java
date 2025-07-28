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

                // in my responsebody slot i will send all the things ok

                // i should change this to a admin put data

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
}
