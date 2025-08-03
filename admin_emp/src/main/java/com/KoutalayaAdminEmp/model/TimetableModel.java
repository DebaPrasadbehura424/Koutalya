package com.KoutalayaAdminEmp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "timetable")
public class TimetableModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String program;
    private String branch;
    private String semester;
    private String section;
    private String day;

    @Column(name = "time_slot") 
    private String timeSlot;

    private String subject;

    @Column(name = "teacher_name")
    private String teacherName;

    @Column(name = "room_number")
    private String roomNumber;
}
