### 安装源

```bash
mirrors.aliyun.com/centos/8.5.2111/BaseOS/x86_64/os/
```



Loading mirror speeds from cached hostfile
Could not retrieve mirrorlist http://mirrorlist.centos.org/?release=7&arch=x86_64&repo=os&infra=stock error was curl#6 - "Could not resolve host: mirrorlist.centos.org; 未知的错误"

### 解决方式

```bash
cd /etc/yum.repos.d
mv CentOS-Base.repo CentOS-Base.repo.backup
wget https://mirrors.aliyun.com/repo/Centos-7.repo
mv Centos-7.repo CentOS-Base.repo
yum clean all
yum update
```

### 安装必要的解压工具

```bash
sudo yum install tar xz-utils
```

### 安装tar.xz文件

```bash
sudo yum install package-name.tar.xz
```



Error: Failed to download metadata for repo ‘appstream‘: Cannot prepare internal mirrorlist

### 解决方式

```bash
首先判断网络问题
ping baidu.com

镜像更改
cd /etc/yum.repos.d/
sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-*
sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
yum makecache
yum update -y
```



### 图形化

```bash
安装图形化界面
yum groupinstall "Server with GUI" -y
yum groupinstall "Workstation" -y

查看系统启动模式
systemctl get-default

切换图形模式为默认启动方式
systemctl set-default graphical.target

切换到命令行模式
systemctl set-default multi-user.target
```



ERROR: This script has been DISCARDED, please switch to fhs-install-v2ray project.

### 解决方式

```bash
打开文件并修改
sudo nano /etc/hosts
185.199.109.133 raw.githubusercontent.com
185.199.109.133	raw.github.com
地址185.199.109.133使用https://site.ip138.com/raw.githubusercontent.com/查询
```





安装V2ray

```bash
下载
curl -O https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh
安装
bash install-release.sh
启动
systemctl start v2ray
设置开机自启
systemctl enable v2ray
检查V2Ray状态
systemctl status v2ray
重启
systemctl restart v2ray
```

