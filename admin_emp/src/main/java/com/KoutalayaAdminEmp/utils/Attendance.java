package com.KoutalayaAdminEmp.utils;

import lombok.Data;

@Data
public class Attendance {
    private String subject;
    private int totalClasses;
    private int presentClasses;
    private int absentClasses;

    public double getAttendancePercentage() {
        if (totalClasses == 0)
            return 0.0;
        return ((double) presentClasses / totalClasses) * 100;
    }
}
