## 1.nginx的proxy_pass配置路径，加与不加“/”差异巨大

### 1.1 绝对路径

```shell
location /proxy {
    proxy_pass http://192.168.137.181:8080/;
}
```

当访问 `http://127.0.0.1/proxy/test/test.txt`时，nginx匹配到/proxy路径，把请求转发给192.168.137.181:8080服务，实际请求路径为
 `http://10.0.0.1:8080/test/test.txt`，nginx会去掉匹配的“/proxy”。



### 1.2 相对路径

```shell
location /proxy {
    proxy_pass http://10.0.0.1:8080;
}
```

当访问 `http://127.0.0.1/proxy/test/test.txt`时，nginx匹配到/proxy路径，把请求转发给`192.168.137.181:8080`服务，实际请求代理服务器的路径为
 `http://192.168.137.181:8080/proxy/test/test.txt`， 此时nginx会把匹配的“/proxy”也代理给代理服务器。



### 1.3 代理路径添加uri

```shell
location /proxy {
    proxy_pass http://10.0.0.1:8080/static01/;
}
```

当访问 `http://127.0.0.1/proxy/test/test.txt`时，nginx匹配到/proxy路径，把请求转发给192.168.137.181:8080服务，实际请求代理服务器的路径为
 `http://10.0.0.1:8080/static01/test/test.txt`。



