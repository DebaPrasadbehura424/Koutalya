package com.KoutalayaAdminEmp.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

import com.KoutalayaAdminEmp.utils.TransactionData;

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

    private List<TransactionData> transactionData = new ArrayList<>();
}
