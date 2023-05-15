# Vue

## 解决ts内引用vue文件报错问题

在项目的根目录或`src`文件夹下创建一个`.d.ts`文件，例如`vue.d.ts`。

```typescript
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
 }
```

