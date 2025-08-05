package com.KoutalayaAdminEmp.services;

import com.KoutalayaAdminEmp.repository.StudentRepository;
import com.KoutalayaAdminEmp.utils.PasswordGenerator;
import com.KoutalayaAdminEmp.model.StudentModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public StudentModel registerStudent(StudentModel studentModel) {
        String password = PasswordGenerator.generatePassword();
        studentModel.setPassword(password);
        return studentRepository.save(studentModel);
    }

    public List<StudentModel> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<StudentModel> getStudentById(String id) {
        return studentRepository.findById(id);
    }

    public StudentModel updateStudent(String id, StudentModel updatedStudent) {
        Optional<StudentModel> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            StudentModel student = optionalStudent.get();
            student.setName(updatedStudent.getName());
            student.setEmail(updatedStudent.getEmail());
            student.setRegistrationId(updatedStudent.getRegistrationId());
            student.setBranch(updatedStudent.getBranch());
            student.setStartYear(updatedStudent.getStartYear());
            student.setEndYear(updatedStudent.getEndYear());
            student.setPassword(updatedStudent.getPassword());
            student.setPhoto(updatedStudent.getPhoto());
            return studentRepository.save(student);
        } else {
            throw new RuntimeException("Student not found with ID: " + id);
        }
    }

    public void deleteStudent(String id) {
        studentRepository.deleteById(id);
    }

    public ResponseEntity<?> loginStudent(StudentModel studentModel) {
        Optional<StudentModel> isStudentExist = studentRepository
                .findByRegistrationId(studentModel.getRegistrationId());

        if (isStudentExist.isEmpty()) {
            return new ResponseEntity<>("Student not found", HttpStatus.NOT_FOUND);
        }

        if (!studentModel.getPassword().equals(isStudentExist.get().getPassword())) {
            return new ResponseEntity<>("Invalid password", HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(isStudentExist.get(), HttpStatus.OK);
    }

}
