package com.KoutalayaAdminEmp.model;

import java.util.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "notices")
public class NoticeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    // @ElementCollection
    // @CollectionTable(name = "notice_list", joinColumns = @JoinColumn(name =
    // "notice_id"))
    // @Column(name = "notice")
    // private List<String> noticeList;

    @Column(nullable = false)
    private String noticeList;

    private Date setDate;

    public NoticeModel() {
    }

    public NoticeModel(Long noticeId, String noticeList, Date setDate) {
        this.noticeId = noticeId;
        this.noticeList = noticeList;
        this.setDate = setDate;
    }

    public Long getNoticeId() {
        return noticeId;
    }

    public void setNoticeId(Long noticeId) {
        this.noticeId = noticeId;
    }

    public String getNoticeList() {
        return noticeList;
    }

    public void setNoticeList(String noticeList) {
        this.noticeList = noticeList;
    }

    public Date getSetDate() {
        return setDate;
    }

    public void setSetDate(Date setDate) {
        this.setDate = setDate;
    }
}
