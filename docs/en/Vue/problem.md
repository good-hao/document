# 问题解决

## 解决ts内引用vue文件报错问题

在项目的根目录或`src`文件夹下创建一个`.d.ts`文件，例如`vue.d.ts`。

```typescript
declare module '*.vue' {
    import { DefineComponent, defineComponent } from 'vue';
    // const component: DefineComponent<{}, {}, any>;
    const component: ReturnType<typeof defineComponent>;
    export default component;
  }
```

## 启用热更新

```ts
//在vite.config.ts中添加
export default defineConfig({
  server:{
    host:"localhost",
    https:false,//是否启用https
    cors:true,//为开发服务器配置cors，默认启用并允许任何源
    open:true,//服务启动时自动在浏览器中打开
    port:5173,
    strictPort:false,//端口被占用是否启动其它端口
    force:true,//是否强制依赖预构建
    hmr:true//是否启动热更新
  }
})
```

