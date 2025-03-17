## 命令

```
nginx -h #查看帮助
nginx -v #查看nginx的版本
nginx -V #查看版本和nginx的配置选项
nginx -t #不指定文件测试配置文件的正确性
nginx -tc  /usr/local/nginx/nginx.conf #指定文件测试配置文件的正确性
nginx -T #测试配置文件，并显示配置文件（这个命令可以快速查看配置文件）
nginx -q #测试配置文件，但是只显示错误信息
nginx -s #发送信号，下面详细介绍
nginx -p #设置前缀
nginx -c #设置配置文件
nginx -g #附加配置文件路径
start nginx #启动
nginx -s stop #强制停止Nginx服务
nginx -s quit #优雅地停止Nginx服务（即处理完所有请求后再停止服务）
nginx -s reload #修改配置后重新加载生效
nginx -s reopen #重新打开日志文件
```



## nginx的proxy_pass配置路径，加与不加“/”差异巨大

### 绝对路径

```shell
location /proxy {
    proxy_pass http://192.168.137.181:8080/;
}
```

当访问 `http://127.0.0.1/proxy/test/test.txt`时，nginx匹配到/proxy路径，把请求转发给192.168.137.181:8080服务，实际请求路径为
 `http://10.0.0.1:8080/test/test.txt`，nginx会去掉匹配的“/proxy”。



### 相对路径

```shell
location /proxy {
    proxy_pass http://10.0.0.1:8080;
}
```

当访问 `http://127.0.0.1/proxy/test/test.txt`时，nginx匹配到/proxy路径，把请求转发给`192.168.137.181:8080`服务，实际请求代理服务器的路径为
 `http://192.168.137.181:8080/proxy/test/test.txt`， 此时nginx会把匹配的“/proxy”也代理给代理服务器。



###  代理路径添加uri

```shell
location /proxy {
    proxy_pass http://10.0.0.1:8080/static01/;
}
```

当访问 `http://127.0.0.1/proxy/test/test.txt`时，nginx匹配到/proxy路径，把请求转发给192.168.137.181:8080服务，实际请求代理服务器的路径为
 `http://10.0.0.1:8080/static01/test/test.txt`。



