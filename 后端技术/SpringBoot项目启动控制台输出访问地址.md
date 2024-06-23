# 项目启动控制台输出访问地址

在Spring Boot项目中，有时我们需要记录或输出访问的地址和IP，以便进行调试、监控或日志记录。以下是如何在Spring Boot中实现这一需求的方法：

## 1、编写获取所有访问地址工具类

```java
package com.example.base.core.utils;

import cn.hutool.core.util.StrUtil;
import org.springframework.boot.web.context.WebServerApplicationContext;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

/**
 * IP地址工具类
 *
 * @author 李东阳
 */
public class IpAddressUtils {
    /**
     * 获取项目启动的IP地址
     * 注: 仅限springboot项目
     **/
    public static List<String> getIpAddressOfStartUp(WebServerApplicationContext context) {
        List<String> addressList = new ArrayList<>();
        try {
            Enumeration<NetworkInterface> interfaces = NetworkInterface.getNetworkInterfaces();
            for (NetworkInterface networkInterface : Collections.list(interfaces)) {
                Enumeration<InetAddress> inetAddresses = networkInterface.getInetAddresses();
                for (InetAddress inetAddress : Collections.list(inetAddresses)) {
                    if (!inetAddress.isLoopbackAddress() && inetAddress.isSiteLocalAddress()) {
                        String address = StrUtil.utf8Str(inetAddress.getHostAddress());
                        int port = context.getWebServer().getPort();
                        String ipAddress = StrUtil.format("http://{}:{}", address, port);
                        addressList.add(ipAddress);
                    }
                }
            }
            return addressList;
        } catch (SocketException e) {
            e.printStackTrace();
            return addressList;
        }
    }
}
```

## 2、在启动类中使用

```java
package com.example;

import cn.hutool.core.lang.Console;
import com.example.base.core.utils.IpAddressUtils;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.context.WebServerApplicationContext;
import org.springframework.context.annotation.Bean;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;

/**
 * @author lidy
 */
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    /**
     * 项目启动输出访问地址
     */
    @Bean
    public ApplicationRunner applicationRunner(WebServerApplicationContext context) {
        return (ApplicationArguments args) -> {
            try {
                Console.log("===============项目启动成功 start===============");
                List<String> ipAddressList = IpAddressUtils.getIpAddressOfStartUp(context);
                ipAddressList.forEach(Console::log);
                Console.log("================项目启动成功 end================");
            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }
}

```

注:本案例中使用到了hutool工具来做控制台输出，需要在pom.xml引入如下如下坐标。

```xml
<dependency>
    <groupId>cn.hutool</groupId>
    <artifactId>hutool-all</artifactId>
    <version>5.8.22</version>
</dependency>
```

如果不想引入相关工具，可以使用其他控制台输出方案即可。

## 3、效果展示

![image-20240623145147685](https://lidy-1300763668.cos.ap-nanjing.myqcloud.com/image/202406231451756.png)
