# EF Core注意事项

## 生成语句

```
Add-Migration
Update-Database

Scaffold-DbContext "Server=127.0.0.1;port=3306;Database=database;User ID=root;Password=123456;Charset=utf8;SslMode=None" MySql.EntityFrameworkCore -OutputDir test(文件夹) -f
```


