package com.KoutalayaAdminEmp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.KoutalayaAdminEmp.model.NewsModel;
import com.KoutalayaAdminEmp.services.NewsServices;

@RestController
@RequestMapping("/news")
public class NewsController {

    @Autowired
    private NewsServices newsServices;

    @PostMapping("/create")
    public ResponseEntity<NewsModel> createNews(@RequestBody NewsModel newsModel) {
        NewsModel createdNews = newsServices.createNews(newsModel);
        return new ResponseEntity<>(createdNews, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<NewsModel>> getAllNews() {
        return new ResponseEntity<>(newsServices.getAllNews(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NewsModel> getNewsById(@PathVariable Long id) {
        return newsServices.getNewsById(id)
                .map(news -> ResponseEntity.ok(news))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> updateNews(@PathVariable Long id, @RequestBody NewsModel updatedNews) {
        NewsModel result = newsServices.updateNews(id, updatedNews);
        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("News not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteNews(@PathVariable Long id) {
        boolean deleted = newsServices.deleteNewsById(id);
        if (deleted) {
            return new ResponseEntity<>("News deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("News not found", HttpStatus.NOT_FOUND);
        }
    }
}
