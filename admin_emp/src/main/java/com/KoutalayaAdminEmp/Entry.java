package com.KoutalayaAdminEmp;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController

public class Entry {
    @GetMapping("/")
    public String postMethodName() {
        return "Hello world";
    }

}
