# PCF控件

## 创建

```text
pac pcf init --namespace 命名空间 --name 控件名 --template field
pac pcf init --namespace PCFDateTime --name PCFDateTime --template field install
```

在Visual Studio Code中打开解决方案

```text
Code .
```

安装组件

```text
npm install 或
yarn install
```

编写代码

```text
　　......
```

解决方案

```text
npm run build 或
yarn build
```

预览和调试解决方案

```text
npm start
npm start watch
yarn start
yarn start watch
```

创建打包目录

```text
mkdir Solutions
cd Solutions
```

初始化Dataverse 解决方案

```text
pac solution init --publisher-name 发布者(DefaultPublisherorgde161028) --publisher-prefix 发布者前缀(new)
pac solution init --publisher-name DefaultPublisherorgde161028 --publisher-prefix new
```



![](../images/3.jpg)

添加组件到解决方案

```text
控件绝对路径
pac solution add-reference --path F:\Apps\test\ImageUploadControl
在Solutions目录下的相对路径
pac solution add-reference --path ../
```

生成/发布解决方案包(此方案可能存在问题)

```text
msbuild /t:build /restore
msbuild /p:configuration=Release
```



错误信息

![](../images/1.jpg)

生成/发布解决方案包

```text
dotnet build
```

返回到主目录

```text
cd ..
```

连接CDS

```text
pac auth create --url (环境URL)
pac auth create --url https://orgde161028.crm.dynamics.cn/
```



![](../images/2.jpg)



推送解决方案

```text
pac pcf push --publisher-prefix 发布者前缀
pac pcf push --publisher-prefix new
```



## 更新

```text
yarn build  或  npm build
cd Solutions
dotnet build
pac pcf push --publisher-prefix new
```

