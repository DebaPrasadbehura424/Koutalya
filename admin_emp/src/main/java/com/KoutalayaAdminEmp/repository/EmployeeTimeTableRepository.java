package com.KoutalayaAdminEmp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.KoutalayaAdminEmp.model.EmpTimeTableModel;

public interface EmployeeTimeTableRepository extends MongoRepository<EmpTimeTableModel, String> {

}
