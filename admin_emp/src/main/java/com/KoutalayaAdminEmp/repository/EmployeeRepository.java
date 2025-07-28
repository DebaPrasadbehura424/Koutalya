package com.KoutalayaAdminEmp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.KoutalayaAdminEmp.model.EmployeeModel;

public interface EmployeeRepository extends MongoRepository<EmployeeModel, String> {

    EmployeeModel findByEmail(String email);

}
