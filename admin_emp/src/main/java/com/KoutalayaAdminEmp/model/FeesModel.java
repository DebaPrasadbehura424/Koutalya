package com.KoutalayaAdminEmp.model;

import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import lombok.Data;

@Document(collection = "Fees")
@Data
public class FeesModel {
    @Id
    private String id;

    private int semester;
    private String courseDues;
    private String hostelDues;
    private String transportDues;
    private String fine;
    private String totalDues;
    private String payNow;

    // trasaction
    private String trasanctionDate;
    private String amountPaid;
    private String bankRefNo;
    private String mode;
    private String status;

}
