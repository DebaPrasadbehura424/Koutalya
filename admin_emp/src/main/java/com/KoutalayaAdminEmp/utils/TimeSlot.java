package com.KoutalayaAdminEmp.utils;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimeSlot {
    private String subject;
    private String startTime;
    private String endTime;
    private String roomNo;
    private String courseType;
    private String section;
}
