package com.KoutalayaAdminEmp.utils;

import lombok.Data;

@Data
public class TransactionData {
    private String trasanctionDate;
    private String amountPaid;
    private String bankRefNo;
    private String mode;
    private String status;
    private String payFor;
}
