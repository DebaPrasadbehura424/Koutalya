package com.KoutalayaAdminEmp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.KoutalayaAdminEmp.model.FeesModel;

public interface FeesRepository extends MongoRepository<FeesModel,String> {
    

}
