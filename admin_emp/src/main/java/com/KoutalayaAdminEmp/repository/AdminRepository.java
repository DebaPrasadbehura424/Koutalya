package com.KoutalayaAdminEmp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.KoutalayaAdminEmp.model.AdminModel;

public interface AdminRepository extends JpaRepository<AdminModel, Long> {

    boolean existsByIdCardNumber(String idCardNumber);

    boolean existsByEmail(String email);

    Optional<AdminModel> findByIdCardNumber(String id);

    Optional<AdminModel> findByEmail(String data);

}
