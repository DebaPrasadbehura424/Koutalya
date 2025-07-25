package com.KoutalayaAdminEmp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.KoutalayaAdminEmp.model.AdminModel;
import com.KoutalayaAdminEmp.services.AdminServices;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminServices adminServices;

    @PostMapping("/register")
    public ResponseEntity<?> adminRegister(@RequestBody AdminModel adminModel) {
        try {
            AdminModel newAdmin = adminServices.getRegister(adminModel);
            if (newAdmin == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            return new ResponseEntity<>(newAdmin, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error during registration: " + e.getMessage(),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody AdminModel adminModel) {

        try {
            Optional<AdminModel> optionalAdmin = adminServices.getById(
                    Optional.ofNullable(adminModel.getIdCardNumber()).orElse(adminModel.getEmail()));

            if (optionalAdmin.isEmpty()) {
                return new ResponseEntity<>("Admin not found", HttpStatus.NOT_FOUND);
            }

            AdminModel existingAdmin = optionalAdmin.get();

            if (!existingAdmin.getAdminPassword().equals(adminModel.getAdminPassword())) {
                return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
            }

            return new ResponseEntity<>(existingAdmin, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error during login: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
