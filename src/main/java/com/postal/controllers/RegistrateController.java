package com.postal.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegistrateController {

    private static Map<String, Integer> calls = new HashMap<>();

    @RequestMapping(value = "/api/reg", produces = "text/plain")
    public String reg(
        HttpServletResponse response,
        @RequestParam String refer,
        @RequestParam String visitPageUrl,
        @RequestParam String count,
        @RequestParam String uniqueVisit
    ) {
        response.setHeader("Access-Control-Allow-Origin", "*");

        System.out.println("******************************************");
        System.out.println("REFER NAME     : " + refer);
        System.out.println("VISIT PAGE URL : " + visitPageUrl);
        System.out.println("VISIT          : " + count + " times");
        System.out.println("UNIQUE VISIT   : " + (Boolean.parseBoolean(uniqueVisit) ? "YES" : "NO"));
        System.out.println("******************************************\n");

        return "ok";
    }


    @RequestMapping(value = "/api/script.js", produces = "text/javascript")
    public String script(HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");

        File file = new File(getClass().getClassLoader().getResource("script.js").getFile());
        String content = new String(Files.readAllBytes(file.toPath()));

        return content;
    }

}
