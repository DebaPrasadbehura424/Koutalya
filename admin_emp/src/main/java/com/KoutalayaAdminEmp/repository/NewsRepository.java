package com.KoutalayaAdminEmp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.KoutalayaAdminEmp.model.NewsModel;


public interface NewsRepository extends JpaRepository<NewsModel, Long> {

}
