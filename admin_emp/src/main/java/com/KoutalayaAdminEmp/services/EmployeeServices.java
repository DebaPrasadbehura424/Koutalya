package com.KoutalayaAdminEmp.services;

import com.KoutalayaAdminEmp.model.EmployeeModel;
import com.KoutalayaAdminEmp.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EmployeeServices {

    @Autowired
    private EmployeeRepository employeeRepository;

    public EmployeeModel registerEmployee(EmployeeModel emp) {

        if (employeeRepository.findByEmail(emp.getEmail()) != null) {
            throw new RuntimeException("Employee with this email already exists.");
        }

        return employeeRepository.save(emp);
    }

    public EmployeeModel login(String email, String password) {
        EmployeeModel existingEmp = employeeRepository.findByEmail(email);

        if (existingEmp == null) {
            throw new RuntimeException("No employee found with this email.");
        }

        if (!existingEmp.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password.");
        }

        return existingEmp;
    }
}
