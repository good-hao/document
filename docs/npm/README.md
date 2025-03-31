# npm

```text
npm cache clean --force //清除缓存

npm config get registry  // 查看npm当前镜像源

npm config set registry https://registry.npm.taobao.org/  // 设置npm镜像源
```







# yarn

```text
yarn cache clean //清除缓存

yarn config get registry  // 查看yarn当前镜像源

yarn config set registry https://registry.npm.taobao.org/  // 设置yarn镜像源
```





# pnpm

```text
npm install pnpm -g //全局安装

pnpm store prune //移除所有不再被使用的包

pnpm config get registry //查看源

pnpm install // 引用

pnpm i //引用

pnpm add 包  // -S  默认写入dependencies

pnpm add -D  // -D devDependencies

pnpm add -g  // 全局安装

pnpm remove 包  //移除包

pnpm remove 包 --global  //移除全局包

pnpm up  //更新所有依赖项

pnpm upgrade 包  //更新包

pnpm upgrade 包 --global  //更新全局包

pnpm config set registry https://registry.npmmirror.com/ //设置pnpm镜像源

```









# 镜像源地址部分如下：

```text
npm --- https://registry.npmjs.org/

yarn --- https://registry.yarnpkg.com

pnpm --- https://pnpm.js.org/installation/

cnpm --- https://r.cnpmjs.org/

nj --- https://registry.nodejitsu.com/

rednpm --- https://registry.mirror.cqupt.edu.cn/

npmMirror --- https://skimdb.npmjs.com/registry/

deunpm --- http://registry.enpmjs.org/
```









# nrm镜像源管理工具（npm registry manager）

## 全局安装 nrm

```text
npm install -g nrm
```

## 查看当前可使用的镜像源

```tex
nrm ls
```

## 使用镜像源进行依赖下载

```tex
nrm use cnpm
```

