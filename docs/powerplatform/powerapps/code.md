# 创建pcf控件

```
pac pcf init --namespace 命名空间 --name 控件名 --template field
pac pcf init --namespace PCFDateTime --name PCFDateTime --template field install
```

在Visual Studio Code中打开解决方案

```
Code .
```

安装组件

```
npm install
```

编写代码

```
　　......
```

解决方案

```
npm run build
```

预览和调试解决方案

```
npm start
npm start watch
```

创建打包目录

```
mkdir Solutions
cd Solutions
```

初始化Dataverse 解决方案

```
pac solution init --publisher-name 发布者DefaultPublisherorgde161028 --publisher-prefix 发布者前缀new
pac solution init --publisher-name pcfcomponent --publisher-prefix pcf
```

![](../images/3.jpg)

添加组件到解决方案

```
控件绝对路径
pac solution add-reference --path F:\Apps\test\ImageUploadControl
在Solutions目录下的相对路径
pac solution add-reference --path ../
```

生成/发布解决方案包(此方案可能存在问题)

```
msbuild /t:build /restore
msbuild /p:configuration=Release
```

错误信息

![](../images/1.jpg)

生成/发布解决方案包

```
dotnet build
```

连接CDS

```
pac auth create --url (环境URL)
```

![](../images/2.jpg)

推送解决方案

```
pac pcf push --publisher-prefix 发布者前缀
```
