package com.KoutalayaAdminEmp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.KoutalayaAdminEmp.model.NoticeModel;
import com.KoutalayaAdminEmp.services.NoticeServices;
import com.KoutalayaAdminEmp.utils.DateGenerator;

import java.util.List;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeServices noticeServices;

    @PostMapping("/create")
    public ResponseEntity<?> createNotice(@RequestBody NoticeModel noticeModel) {
        noticeServices.saveNotice(noticeModel);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<NoticeModel>> getAllNotice() {
        List<NoticeModel> notices = noticeServices.getAllNotices();
        return ResponseEntity.ok(notices);
    }

    @PatchMapping("/edit/{id}")
    public ResponseEntity<?> editNotice(@PathVariable Long id, @RequestBody NoticeModel updatedNotice) {
        NoticeModel noticeModel = noticeServices.getNoticeById(id);
        if (noticeModel == null) {
            return ResponseEntity.notFound().build();
        }

        noticeModel.setNoticeList(updatedNotice.getNoticeList());
        noticeModel.setSetDate(DateGenerator.generateDate());

        NoticeModel updated = noticeServices.saveNotice(noticeModel);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        Boolean isDeleted = noticeServices.deleteNoticeById(id);
        if (isDeleted == false) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
