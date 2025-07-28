package com.KoutalayaAdminEmp.controller;

import com.KoutalayaAdminEmp.model.EmployeeModel;
import com.KoutalayaAdminEmp.services.EmployeeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/emps")
public class EmployeeController {

    @Autowired
    private EmployeeServices employeeServices;

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
            if (emp != null) {
                return ResponseEntity.ok(emp);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid email or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Login error: " + e.getMessage());
        }
    }
}
