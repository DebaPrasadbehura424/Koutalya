package com.KoutalayaAdminEmp.services;

import com.KoutalayaAdminEmp.model.TimetableModel;
import com.KoutalayaAdminEmp.repository.TimetableRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TimetableService {

    private final TimetableRepository repository;

    public TimetableService(TimetableRepository repository) {
        this.repository = repository;
    }

    public TimetableModel saveEntry(TimetableModel model) {
        return repository.save(model);
    }

    public List<TimetableModel> getTimetable(String program, String branch, String semester, String section) {
        return repository.findByProgramAndBranchAndSemesterAndSection(program, branch, semester, section);
    }

    public List<TimetableModel> getAll() {
        return repository.findAll();
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
