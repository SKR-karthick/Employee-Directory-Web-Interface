package com.example;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class App {
    public static void main(String[] args) {
        try {
            // Configure FreeMarker
            Configuration cfg = new Configuration(Configuration.VERSION_2_3_31);
            cfg.setClassForTemplateLoading(App.class, "/templates");
            cfg.setDefaultEncoding("UTF-8");
            cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
            cfg.setLogTemplateExceptions(false);
            cfg.setWrapUncheckedExceptions(true);

            // Create sample employee data
            List<Map<String, Object>> employees = createSampleEmployees();
            
            // Create data model
            Map<String, Object> dataModel = new HashMap<>();
            dataModel.put("employees", employees);
            dataModel.put("title", "Employee Directory");

            // Get template
            Template template = cfg.getTemplate("dashboard.ftlh");

            // Generate HTML
            StringWriter out = new StringWriter();
            template.process(dataModel, out);
            
            // Fix paths for local viewing
            String html = out.toString();
            html = html.replace("href=\"/static/css/style.css\"", "href=\"src/main/resources/static/css/style.css\"");
            html = html.replace("src=\"/static/js/data.js\"", "src=\"src/main/resources/static/js/data.js\"");
            html = html.replace("src=\"/static/js/app.js\"", "src=\"src/main/resources/static/js/app.js\"");

            // Save HTML to file
            java.nio.file.Path outputPath = java.nio.file.Paths.get("output.html");
            java.nio.file.Files.write(outputPath, html.getBytes());
            
            // Output the rendered HTML
            System.out.println("=== RENDERED HTML OUTPUT ===");
            System.out.println(html);
            System.out.println("=== END OUTPUT ===");
            System.out.println("\nHTML file saved as: " + outputPath.toAbsolutePath());
            System.out.println("You can open this file in your browser!");

        } catch (IOException | TemplateException e) {
            System.err.println("Error processing template: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static List<Map<String, Object>> createSampleEmployees() {
        List<Map<String, Object>> employees = new ArrayList<>();
        
        Map<String, Object> emp1 = new HashMap<>();
        emp1.put("id", 1);
        emp1.put("firstName", "John");
        emp1.put("lastName", "Doe");
        emp1.put("email", "john.doe@company.com");
        emp1.put("department", "Engineering");
        emp1.put("role", "Senior Developer");
        employees.add(emp1);

        Map<String, Object> emp2 = new HashMap<>();
        emp2.put("id", 2);
        emp2.put("firstName", "Jane");
        emp2.put("lastName", "Smith");
        emp2.put("email", "jane.smith@company.com");
        emp2.put("department", "Marketing");
        emp2.put("role", "Marketing Manager");
        employees.add(emp2);

        Map<String, Object> emp3 = new HashMap<>();
        emp3.put("id", 3);
        emp3.put("firstName", "Mike");
        emp3.put("lastName", "Johnson");
        emp3.put("email", "mike.johnson@company.com");
        emp3.put("department", "Sales");
        emp3.put("role", "Sales Representative");
        employees.add(emp3);

        Map<String, Object> emp4 = new HashMap<>();
        emp4.put("id", 4);
        emp4.put("firstName", "Alice");
        emp4.put("lastName", "Williams");
        emp4.put("email", "alice.williams@company.com");
        emp4.put("department", "HR");
        emp4.put("role", "Manager");
        employees.add(emp4);

        Map<String, Object> emp5 = new HashMap<>();
        emp5.put("id", 5);
        emp5.put("firstName", "Bob");
        emp5.put("lastName", "Brown");
        emp5.put("email", "bob.brown@company.com");
        emp5.put("department", "IT");
        emp5.put("role", "Developer");
        employees.add(emp5);

        Map<String, Object> emp6 = new HashMap<>();
        emp6.put("id", 6);
        emp6.put("firstName", "Charlie");
        emp6.put("lastName", "Lee");
        emp6.put("email", "charlie.lee@company.com");
        emp6.put("department", "Finance");
        emp6.put("role", "Analyst");
        employees.add(emp6);

        return employees;
    }
}