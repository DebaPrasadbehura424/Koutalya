package com.KoutalayaAdminEmp.utils;

import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DaySchedule {
    private String day;
    private List<TimeSlot> slots;
}
