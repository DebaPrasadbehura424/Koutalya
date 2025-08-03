package com.KoutalayaAdminEmp.model;

import lombok.*;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;

import java.util.List;

@Document(collection = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeModel {
    // those are needed we will handle that on our fornted not in my backend only to
    // this model
    @Id
    private String id;

    private String empName;

    @Indexed(unique = true)
    private String email;

    private String phoneNumber;

    private String password;

    private String empPhoto;

    private String salary;
    private String WorkInformation;

    private String courseType;
    private String branch;
    private List<String> subjects;

    @DBRef
    private EmpTimeTableModel timeTable;
}
