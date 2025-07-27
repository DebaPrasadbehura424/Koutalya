package com.KoutalayaAdminEmp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.KoutalayaAdminEmp.model.NoticeModel;
import com.KoutalayaAdminEmp.repository.NoticeRepository;
import com.KoutalayaAdminEmp.utils.DateGenerator;

import jakarta.persistence.EntityNotFoundException;

@Service
public class NoticeServices {

    @Autowired
    private NoticeRepository noticeRepository;

    public NoticeModel saveNotice(NoticeModel noticeModel) {
        if (noticeModel.getSetDate() == null) {
            noticeModel.setSetDate(DateGenerator.generateDate());

        }

        return noticeRepository.save(noticeModel);
    }

    public List<NoticeModel> getAllNotices() {
        return noticeRepository.findAll();
    }

    public Boolean deleteNoticeById(Long id) {
        try {
            noticeRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public NoticeModel getNoticeById(Long id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Notice not found with id: " + id));
    }

}
