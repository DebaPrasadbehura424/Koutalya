package com.KoutalayaAdminEmp.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.KoutalayaAdminEmp.model.StudentModel;

public interface StudentRepository extends MongoRepository<StudentModel, String> {
    Optional<StudentModel> findByRegistrationId(String registrationId);

}
