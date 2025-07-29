package com.KoutalayaAdminEmp.services;

import com.KoutalayaAdminEmp.model.EmployeeModel;
import com.KoutalayaAdminEmp.model.EmpTimeTableModel;
import com.KoutalayaAdminEmp.repository.EmployeeRepository;
import com.KoutalayaAdminEmp.repository.EmployeeTimeTableRepository;
import com.KoutalayaAdminEmp.utils.DaySchedule;
import com.KoutalayaAdminEmp.utils.PasswordGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class EmployeeServices {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeTimeTableRepository employeeTimeTableRepository;

    public EmployeeModel registerEmployee(EmployeeModel empModel) {
        if (employeeRepository.findByEmail(empModel.getEmail()) != null) {
            throw new RuntimeException("Employee with this email already exists.");
        }

        List<String> daysOfWeek = Arrays.asList("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
        List<DaySchedule> weeklySchedule = new ArrayList<>();
        for (String day : daysOfWeek) {
            weeklySchedule.add(new DaySchedule(day, new ArrayList<>()));
        }

        EmpTimeTableModel newEmpTimeTableModel = new EmpTimeTableModel();
        newEmpTimeTableModel.setWeeklySchedule(weeklySchedule);
        EmpTimeTableModel savedEmpTimeTableModel = employeeTimeTableRepository.save(newEmpTimeTableModel);
        empModel.setTimeTable(savedEmpTimeTableModel);

        empModel.setPassword(PasswordGenerator.generatePassword());

        return employeeRepository.save(empModel);
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

    public List<EmployeeModel> getAllEmployee() {
        return employeeRepository.findAll();

    }

    public EmployeeModel findByEmail(String email) {
        return employeeRepository.findByEmail(email);
    }
}
