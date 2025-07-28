package com.KoutalayaAdminEmp.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.KoutalayaAdminEmp.model.AdminModel;
import com.KoutalayaAdminEmp.repository.AdminRepository;
import com.KoutalayaAdminEmp.utils.PasswordGenerator;

@Service
public class AdminServices {

    @Autowired
    private AdminRepository adminRepository;

    public AdminModel getRegister(AdminModel adminModel) {
        if (adminRepository.existsByEmail(adminModel.getEmail()) ||
                adminRepository.existsByIdCardNumber(adminModel.getIdCardNumber())) {
            return null;
        }
        if (adminModel.getAdminPassword() == null || adminModel.getAdminPassword().isEmpty()) {
            adminModel.setAdminPassword(PasswordGenerator.generatePassword());
        }

        return adminRepository.save(adminModel);
    }

    public Optional<AdminModel> getById(String data) {
        if (data.contains("@")) {// itmeans it is a email
            return adminRepository.findByEmail(data);
        }
        return adminRepository.findByIdCardNumber(data);// else it is id card number
    }

}
