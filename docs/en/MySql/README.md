# 语句

设置为所有网络都可以连接

```sql
update user set host='%' where user='root';
```

创建新用户

```sql
create user 用户名 identified by '密码';
```

分配给用户权限，权限包括（all，select，insert，update，delete，create，drop），on后面加库名，（数据库.数据表，*是所有库）

```sql
grant 权限 on EmpireDb.* to '用户名' @'%';
```

执行刷新

```sql
FLUSH PRIVILEGES;
```

