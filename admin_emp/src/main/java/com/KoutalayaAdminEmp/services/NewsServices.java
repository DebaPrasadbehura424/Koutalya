package com.KoutalayaAdminEmp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.KoutalayaAdminEmp.model.NewsModel;
import com.KoutalayaAdminEmp.repository.NewsRepository;

@Service
public class NewsServices {

    @Autowired
    private NewsRepository newsRepository;

    public NewsModel createNews(NewsModel news) {
        return newsRepository.save(news);
    }

    public List<NewsModel> getAllNews() {
        return newsRepository.findAll();
    }

    public Optional<NewsModel> getNewsById(Long id) {
        return newsRepository.findById(id);
    }

    public NewsModel updateNews(Long id, NewsModel updatedNews) {
        Optional<NewsModel> optionalNews = newsRepository.findById(id);
        if (optionalNews.isPresent()) {
            NewsModel existingNews = optionalNews.get();
            existingNews.setTitle(updatedNews.getTitle());
            existingNews.setContext(updatedNews.getContext());
            existingNews.setImageURL(updatedNews.getImageURL());
            return newsRepository.save(existingNews);
        }
        return null;
    }

    public boolean deleteNewsById(Long id) {
        if (newsRepository.existsById(id)) {
            newsRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
