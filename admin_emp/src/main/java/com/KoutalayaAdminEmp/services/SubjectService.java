package com.KoutalayaAdminEmp.services;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class SubjectService {
    public List<String> getSubjectsFor(String program, String branch, int semester, String section) {
        if (program.equalsIgnoreCase("B.Tech") &&
                branch.equalsIgnoreCase("CSE") &&
                semester == 1 &&
                section.equalsIgnoreCase("A")) {
            return List.of("Operating Systems", "DBMS", "Computer Networks", "Machine Learning");

        } else if (program.equalsIgnoreCase("B.Tech") &&
                branch.equalsIgnoreCase("CSE") &&
                semester == 1 &&
                section.equalsIgnoreCase("B")) {
            return List.of("Digital Signal Processing", "VLSI Design", "Control Systems");
        }

        return List.of("General studies");
    }
}
