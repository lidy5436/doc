# 防火墙配置-在centos中配置防火墙

#### 1、查看 firewalld 服务状态

```shell
systemctl status firewalld
```

#### 2、查看 firewalld 状态

```shell
firewall-cmd --state
```

#### 3、开启、重启、关闭、firewalld.service服务

```shell
# 开启
service firewalld start
# 重启
service firewalld restart
# 关闭
service firewalld stop
```

#### 4、查看防火墙规则

```shell
firewall-cmd --list-all
```

#### 5、查询、开放、关闭端口

```shell
# 查询端口是否开放
firewall-cmd --query-port=80/tcp
# 开放80端口
firewall-cmd --permanent --add-port=80/tcp
# 移除端口
firewall-cmd --permanent --remove-port=80/tcp
#开放5000-6000端口
firewall-cmd --permanent  --add-port=5000-6000/tcp

#重启防火墙(修改配置后要重启防火墙)
firewall-cmd --reload    
```

