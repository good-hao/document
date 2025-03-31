### 解决方式

ubuntu-24.04.1-live-server-amd64

ping  command no found

```bash
sudo apt-get install iputils-ping
```

### 界面化

```bash
sudo apt install ubuntu-mate-desktop
```

### 解压

```bash
tar –xvf file.tar    //解压 tar包
tar -xzvf file.tar.gz    //解压tar.gz
gunzip FileName.gz    //第一种 *.gz 解压
bzip2 -d FileName.bz2    //第一种解压 *.bz2 文件
tar jxvf FileName.tar.bz2    //第一种解压 *.tar.bz2 文件
unzip FileName.zip    //解压 *.zip 文件
unrar e Filename.rar　　//解压 *.rar 文件
```

### 出现initramfs

```bash
fsck /dev/sda1 -y //(sda1还是sda2要看倒数第三行的显示)
```

### 出现E: dpkg was interrupted, you must manually run 'dpkg --configure -a' to correct the problem.

```bash
sudo dpkg --configure -a
```

### 删除语法

```bash
sudo apt-get remove <package name> && sudo apt-get autoremove
dpkg --list //列出已安装的软件
```

### 解决system program problem detected

```bash
sudo rm /var/crash/*   //删除crash文件
sudo gedit /etc/default/apport  //将其中的enable=1改为enable=0即可 关闭pop up功能
```

