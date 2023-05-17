# Nlog

## 日志级别

```
minlevel ：最低日志级别。

maxlevel：最高日志级别。

level：单一日志级别。

levels：一系列日志级别，由逗号分隔。

final：是否是最后的匹配路由，true表示匹配到这里就结束。

writeTo：规则匹配时日志应该被写入的一系列目标，由逗号分隔。就是tagets对应的name。

日志级别有如下，自上而下，等级递增。

Trace - 最常见的记录信息，一般用于普通输出- Debug - 同样是记录信息，不过出现的频率要比Trace少一些，一般用来调试程序- Info - 信息类型的消息- Warn - 警告信息，一般用于比较重要的场合- Error - 错误信息- Fatal - 致命异常信息。一般来讲，发生致命异常之后程序将无法继续执行。
```

## 代码实现

```c#
//创建日志记录对象
Logger Logger = NLog.LogManager.GetCurrentClassLogger();
```

##  配置文件信息

```
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
    xmlns:xsi=http://www.w3.org/2001/XMLSchema-instance
    autoReload="true"  //修改后自动加载
    throwExceptions="true"  //NLog日志系统抛出异常
 	internalLogFile="c:\log\nlog.txt" //NLog内部日志文件位置
	internalLogLevel="Debug" //日志级别 
>
```

## NLog等级使用

```
指定特定等级 如：level="Warn"
指定多个等级 如：levels="Warn,Debug" 以逗号隔开
指定等级范围 如：minlevel="Warn" maxlevel="Error"
```

## 邮箱配置

```
<targets>
    <target xsi:type="Mail"
            name="SendMail"
            smtpServer="你的邮件服务器"
            smtpPort="你的邮件服务器端口"
            smtpAuthentication="Basic"
            smtpUserName="你的邮件服务器名"
            smtpPassword="你的邮件服务器密码"
            enableSsl="false"
            addNewLines="false"
            from="你的发件邮箱"
            to="你的收件邮箱"
            subject="subject:${machinename}报错"
            header="---------------------开头-------------------------"
            body="${newline}${message}${newline}"
            footer="---------------------结尾-------------------------"
            encoding="UTF-8"/>
</targets>

<rules>
	<logger name="*" level="Error"  writeTo="SendMail"></logger>
</rules>
```

## 数据库配置

nuget引入程序集

```
NLog.Database   NLog5.0+必须单独添加数据库支持
MySql.Data      数据库驱动
NLog.Web.AspNetCore  .net core中可使用
```

```
<targets>
       <target name="mysql_log" xsi:type="Database"
	 dbProvider="MySql.Data.MySqlClient.MySqlConnection,MySql.Data"
	 connectionString="server=127.0.0.1;port=3306;Database=ZhuDb;user id=root;pwd=123456;SslMode=none;allowPublicKeyRetrieval=true"
	 commandText="INSERT INTO logs(app_name,log_date, thread, `level`, logger, message, `exception`)VALUES(@app_name,@log_date, @thread,@log_level, @logger, @message, @exception);">
			<parameter name="@app_name" layout="AspNetCoreNlog" />
			<parameter name="@log_date" layout="${date}" />
			<parameter name="@thread" layout="${threadid}" />
			<parameter name="@log_level" layout="${level}" />
			<parameter name="@logger" layout="${logger}" />
			<parameter name="@message" layout="${message}" />
			<parameter name="@exception" layout="${exception:tostring}" />
		</target>
</targets>

<rules>
	<logger name="Database" level="Error" writeTo="mysql_log"/>
</rules>

CREATE TABLE `logs` (
  `log_id` bigint NOT NULL AUTO_INCREMENT,
  `app_name` varchar(100) NOT NULL,
  `log_date` datetime NOT NULL,
  `thread` varchar(100) NOT NULL,
  `level` varchar(50) NOT NULL,
  `logger` varchar(255) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `exception` varchar(2000) NOT NULL,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```

