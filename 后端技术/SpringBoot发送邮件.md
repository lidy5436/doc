## SpringBoot集成邮件服务

本文将介绍如何使用Spring Boot集成QQ邮箱的邮件服务，实现Java发送邮件功能。

### 开启邮件服务

以QQ邮箱为例，首先需要开启SMTP服务。

| ![image-20240623135859038](https://lidy-1300763668.cos.ap-nanjing.myqcloud.com/image/202406231358113.png) | ![image-20240623140042657](https://lidy-1300763668.cos.ap-nanjing.myqcloud.com/image/202406231400712.png) |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                     第一步 首页点击设置                      |                       第二步 点击账号                        |
| ![image-20240623140203855](https://lidy-1300763668.cos.ap-nanjing.myqcloud.com/image/202406231402907.png) | ![image-20240623140522737](https://lidy-1300763668.cos.ap-nanjing.myqcloud.com/image/202406231405793.png) |
|         第三步 下滑找到SMTP相关文件服务，获取验证码          |                  第四步 复制获取到的授权码                   |

### 引入依赖

在`pom.xml`文件中引入发送邮件和Thymeleaf模板引擎相关依赖。

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-mail</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-thymeleaf</artifactId>
</dependency>
```

### 配置邮件服务

在`application.yml`文件中添加邮件服务的配置。

```yaml
spring:
  mail:
    host: smtp.qq.com
    username: XXXXXXXX@qq.com 
    password: XXXXXXXXXXXXXXX(授权码)
    port: 587
    default-encoding: UTF-8
```

### 实现邮件服务类

创建一个服务类用于发送邮件。

```java
package com.example;  
  
import org.springframework.beans.factory.annotation.Autowired;  
import org.springframework.beans.factory.annotation.Value;  
import org.springframework.core.io.ClassPathResource;  
import org.springframework.core.io.Resource;  
import org.springframework.mail.SimpleMailMessage;  
import org.springframework.mail.javamail.JavaMailSender;  
import org.springframework.mail.javamail.MimeMessageHelper;  
import org.springframework.stereotype.Service;  
import org.thymeleaf.context.Context;  
import org.thymeleaf.spring5.SpringTemplateEngine;  
  
import javax.mail.MessagingException;  
import javax.mail.internet.MimeMessage;  
import java.io.File;  
  
@Service  
public class MailService {  
  
    @Autowired  
    private JavaMailSender mailSender;  
  
    @Value("${spring.mail.username}")  
    private String username;  
    @Autowired  
    private SpringTemplateEngine templateEngine;  
  
  
    public void sendSimpleMail(String to, String subject, String templateName, Context context) throws MessagingException {  
        MimeMessage message = mailSender.createMimeMessage();  
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");  
  
        String htmlContent = templateEngine.process(templateName, context);  
        helper.setTo(to);  
        helper.setSubject(subject);  
        helper.setText(htmlContent, true);  
        helper.setFrom(username);  
  
        String imagePath = "templates/assist/background.jpg";  
        Resource resource = new ClassPathResource(imagePath);  
        helper.addInline("background", resource);  
        mailSender.send(message);  
    }  
}

```

### 创建邮件模板

在`src/main/resources/templates`目录下新建文件`invitationTemplate.html`。

```html
<!DOCTYPE html>
<html lang="en"
      xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>邮件模板</title>
</head>
<body>
<h1>亲爱的<span th:text="${name}"></span>,</h1>
<p>我们诚挚地邀请您参加我们的活动 <strong><span th:text="${event}"></span></strong>。</p>
<p>活动地点：<span th:text="${location}"></span></p>
<p>活动日期：<span th:text="${date}"></span></p>
<p>活动时间：<span th:text="${time}"></span></p>
<img th:src="'cid:' + ${image}" alt="活动图片"/>
<p>期待您的光临！</p>
</body>
</html>
```

### 创建邮件发送控制器

创建一个控制器来处理发送邮件的请求。

```java
package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;

@RestController
public class EmailController {

    // 自动注入EmailService
    @Autowired
    private MailService mailService;

    /**
     * 发送邮件的端点
     * @param to 收件人邮箱地址
     * @param subject 邮件主题
     * @return 发送结果
     */
    @GetMapping("/send-email")
    public String sendEmail(@RequestParam String to, @RequestParam String subject) {
        Context context = new Context();
        context.setVariable("name", "张三");
        context.setVariable("event", "日常聚会");
        context.setVariable("location", "欢乐广场");
        context.setVariable("date", "2024-06-23");
        context.setVariable("time", "19:30");
        context.setVariable("image","background");
        String message = null;
        try {
            mailService.sendSimpleMail(to,subject,"invitationTemplate",context);
            message = "邮件发送成功";
        }catch (MessagingException e) {
            message = "邮件发送失败";
        }
        return message;
    }
}

```
### 邮件发送测试

通过 postman 进行测试。

![image-20240623141503544](https://lidy-1300763668.cos.ap-nanjing.myqcloud.com/image/202406231415631.png)

去邮箱查看是否收到邮件。

![image-20240623141601251](https://lidy-1300763668.cos.ap-nanjing.myqcloud.com/image/202406231416328.png)
