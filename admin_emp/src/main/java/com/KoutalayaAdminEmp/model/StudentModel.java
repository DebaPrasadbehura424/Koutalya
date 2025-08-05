package com.KoutalayaAdminEmp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "students")
@Data
public class StudentModel {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String email;

    @Indexed(unique = true)
    private String registrationId;

    private String password;

    private String program;
    private String branch;
    private int semester;
    private String section;
    private int startYear;
    private int endYear;

    private String photo;
}
