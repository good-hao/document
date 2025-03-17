## 详细配置

```
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}

http {
	#文件扩展名与文件类型映射表
    include       mime.types;
	#默认文件类型
    default_type  application/octet-stream;

	#定义日志格式
	#log_format  main  '"服务器名称:$server_name - 服务器地址:$server_addr - 服务真正访问的端口:$server_port - Nginx监听的端口:$proxy_port - 原始URI:$request_uri 转发地址:$upstream_addr"' '"客户端的IP地址:$remote_addr - 客户端的端口:$remote_port - 当前URI:$uri "'  '"请求方式:$request_method -- 代理地址:$proxy_host -- 请求地址:$http_host -- 主机:$host"';
	#log_format  main  '"$http_host$request_uri"' '"$proxy_host$uri"';
	log_format  main '客户端地址:$remote_addr - 客户端用户名称:$remote_user - 当前时间:[$time_iso8601] -- 请求的URI和HTTP协议:("$request")  '
					  '"$request_method $scheme://$upstream_addr$request_uri $server_protocol" '
					  '"$request_method $scheme $server_addr $request_uri"'
	                  'HTTP请求状态:("$status") - 发送给客户端文件内容大小:$body_bytes_sent -- 跳转来源:"$http_referer" --  '
	                  '用户终端代理:("$http_user_agent") --  "$http_x_forwarded_for"'
					  '转发地址:"$upstream_addr"' '返回状态:"$upstream_status"';

#开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。
#sendfile指令指定 nginx 是否调用sendfile 函数（zero copy 方式）来输出文件，对于普通应用，必须设为on。如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络IO处理速度，降低系统uptime。
    sendfile        on;
	#此选项允许或禁止使用socke的TCP_CORK的选项，此选项仅在使用sendfile的时候使用
    #tcp_nopush     on;

	#指定 KeepAlive 的超时时间
	#keepalive_timeout  0;
	keepalive_timeout  65;
	
	#gzip  on;
	
	server {
		#监听端口
	    listen       9001;
		#域名可以有多个，用空格隔开
	    server_name  localhost;
	
	    #charset koi8-r;
	
	    #access_log  logs/host.access.log  main;
	
	    location / {
			#根目录
	        root   html/dist;
			#设置默认页
	        index  index.html index.htm;
			
			#拒绝的ip
			#deny 127.0.0.1;  
			#允许的ip
	        #allow 172.18.5.54;
	    }
	
	    #error_page  404              /404.html;
	
	    # redirect server error pages to the static page /50x.html
	    #
	    error_page   500 502 503 504  /50x.html;
	    location = /50x.html {
	        root   html;
	    }
	
	    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
	    #
	    #location ~ \.php$ {
	    #    proxy_pass   http://127.0.0.1;
	    #}
	
	    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
	    #
	    #location ~ \.php$ {
	    #    root           html;
	    #    fastcgi_pass   127.0.0.1:9000;
	    #    fastcgi_index  index.php;
	    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
	    #    include        fastcgi_params;
	    #}
	
	    # deny access to .htaccess files, if Apache's document root
	    # concurs with nginx's one
	    #
	    #location ~ /\.ht {
	    #    deny  all;
	    #}
	}
	
	server {
	    listen       9002;
	    server_name  localhost;
	    location / {
	        root   html/document;
	        index  index.html index.htm;
	    }
	    error_page   500 502 503 504  /50x.html;
	    location = /50x.html {
	        root   html;
	    }
	}
	
	server {
	    listen       9003;
	    server_name  localhost;
	    location / {
			root   html/vueadmin;
	        index  index.html index.htm;
			
			#设置禁用缓存
			add_header Cache-Control no-cache;
			add_header Pragma no-cache;
			add_header Expires 0;
			
			#允许请求的跨域地址，*通配符 always任何情况下都生效
			add_header Access-Control-Allow-Origin * always;
			#设置指定请求的方法
			add_header Access-Control-Allow-Methods 'POST,GET,OPTIONS,DELETE,PUT';
			#设置是否允许ajax异步请求带cookie信息
			add_header Access-Control-Allow-Credentials 'true' always;
			#请求头
			add_header Access-Control-Allow-Headers *;
			proxy_pass http://localhost:5001;
	        proxy_set_header Host $host;
	        proxy_set_header Cookie $http_cookie;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_redirect default;
			#设置请求头Content-Type返回参数格式
			#add_header  Content-Type 'application/json; charset=utf-8';
			if ($request_method = 'OPTIONS') {
			  return 204;
			 }   
	    }
		
	    error_page   500 502 503 504  /50x.html;
	    location = /50x.html {
	        root   html;
	    }
	}
	
	server {
		#监听端口
	    listen       9005;
	    #域名可以有多个，用空格隔开
	    server_name  localhost 127.0.0.1;
		
		#日志
		#error_log       logs/error.log;
	    #access_log      logs/access.log main;
		
		#请求的转发地址和状态
		#add_header backendCode $upstream_status;
	    #add_header BackendIP "$upstream_addr;" always;
	
	   location / {
	        root   html/WebPortal;
	        index  index.html index.htm;
	        # 用于配合前端路由为h5模式使用，防止刷新404 https://router.vuejs.org/zh/guide/essentials/history-mode.html#nginx
	        try_files $uri $uri/ /index.html;
	    }
	
	    # 第一个代理后端地址（vite.config.ts里叫 /api，这里也要保持一致）
	    location /api {
	        proxy_pass http://127.0.0.1:5001;
	        proxy_set_header Host $host;
	        proxy_set_header Cookie $http_cookie;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header X-Forwarded-Proto $scheme;
			proxy_redirect default;
			add_header Access-Control-Allow-Origin *;
			add_header Access-Control-Allow-Headers X-Requested-With;
			add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
	    }
		
	    # redirect server error pages to the static page /50x.html
	    error_page   500 502 503 504  /50x.html;
	    location = /50x.html {
	        root   html;
	    }
	}
	#代理
	upstream my_serve {
		server 127.0.0.1:5001;
	}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;
    
    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;
    
    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;
    
    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;
    
    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}
```

