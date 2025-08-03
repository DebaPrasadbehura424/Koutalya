package com.KoutalayaAdminEmp.controller;

import com.KoutalayaAdminEmp.model.TimetableModel;
import com.KoutalayaAdminEmp.services.TimetableService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timetable")
public class TimetableController {

    private final TimetableService timetableService;

    public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @PostMapping("/add")
    public TimetableModel addEntry(@RequestBody TimetableModel model) {
        return timetableService.saveEntry(model);
    }

    @GetMapping("/get")
    public List<TimetableModel> getTimetable(
            @RequestParam String program,
            @RequestParam String branch,
            @RequestParam String semester,
            @RequestParam(required = false) String section) {
        return timetableService.getTimetable(program, branch, semester, section);
    }

    @GetMapping("/all")
    public List<TimetableModel> getAll() {
        return timetableService.getAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteEntry(@PathVariable Long id) {
        timetableService.deleteById(id);
    }
}
