package com.KoutalayaAdminEmp.repository;

import com.KoutalayaAdminEmp.model.TimetableModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimetableRepository extends JpaRepository<TimetableModel, Long> {
    List<TimetableModel> findByProgramAndBranchAndSemesterAndSection(String program, String branch, String semester,
            String section);

}
