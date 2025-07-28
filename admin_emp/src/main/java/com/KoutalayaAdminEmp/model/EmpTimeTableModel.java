package com.KoutalayaAdminEmp.model;

import com.KoutalayaAdminEmp.utils.DaySchedule;

import jakarta.persistence.Id;
import lombok.*;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employee_time_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpTimeTableModel {
    @Id
    private String id;
    private List<DaySchedule> weeklySchedule;
}
