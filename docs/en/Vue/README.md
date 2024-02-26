# Vue

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

## ref和reactive的区别

`reactive()` 返回的是一个原始对象的 代理（Proxy），和原始对象是不相等的。只有代理对象是响应式的，更改原始对象不会触发更新。

ref在模板中可以自动解包使用，但仅适用于顶层属性，不适用于数组或Map等集合类型的属性。

reactive可以替换整个对象，而ref只能修改内部属性的值。

```vue
//reactive可以将整个对象设置为响应式，ref只能将单个基本类型的变量转换为响应式数据
<script setup lang="ts">
import {ref,reactive} from "vue"
const a = ref(0);
const b = ref(0);
const c = reactive({ count: 0 })
function addref(){
  b.value++;
}
function addreactive(){
  c.count++;
}
</script>
<template>
  <div>
    <button @click="a++">{{ a }}</button>
    <button @click="addref">{{ b }}</button>
    <button @click="c.count++">{{ c.count }}</button>
    <button @click="addreactive">{{ c.count }}</button>
  </div>
</template>
```

## 深拷贝和浅拷贝

深拷贝和浅拷贝是只针对Object和Array这样的引用数据类型的。浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。

**浅拷贝**是按位拷贝对象，它会创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值；如果属性是内存地址（引用类型），拷贝的就是内存地址 ，因此如果其中一个对象改变了这个地址，就会影响到另一个对象。

```js
var obj = { a: {a: "kobe", b: 39} };
var initalObj = {...obj};
```

**深拷贝**会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象

```ts
function deepClone(obj: any, hash = new WeakMap()): any {
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (typeof obj !== "object") return obj;
  if (hash.has(obj)) return hash.get(obj);
  let cloneObj = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}
```

<font color=red>**注意**：</font>当object只有一层的时候，是深拷贝

## v-for

`v-if` 比 `v-for` 的优先级更高。这意味着 `v-if` 的条件将无法访问到 `v-for` 作用域内定义的变量

```vue
//在定义 v-for 的变量别名时使用解构
//const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
<li v-for="({ message }, index) in items">
  {{ message }} {{ index }}
</li>

//const myObject = reactive({
//  title: 'How to do lists in Vue',
//  author: 'Jane Doe',
//  publishedAt: '2016-04-10'
//})
//第一个参数是值，第二个参数是键，第三个参数的索引
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>

//此处 n 的初值是从 1 开始而非 0
<span v-for="n in 10">{{ n }}</span>

//可以在 <template> 标签上使用 v-for 来渲染一个包含多个元素的块
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

## defineProps和defineEmits

```vue
//父组件
<template>
  <Tab
      :page="page"    //传递值
      @pageFn="pageFn"  //传递方法
  ></Tab>
</template>
<script setup>
import Tab from "../../components/freight/Tab.vue";
import { ref, reactive, toRefs, onMounted } from "vue";

const page=ref(1)
const pageFn=(val)=>{
    page.value=val
}
</script>

//子组件
<template>
  <button @click="butFn">改变page值:{{page}}</button>
</template>
<script setup>
import { ref, reactive, toRefs, defineProps, defineEmits } from "vue";
defineProps(["page"]);  //接收父组件传来的值
const emit = defineEmits(["pageFn"]);   //定义一个变量来接收父组件传来的方法
const butFn=()=>{
    emit("pageFn",5)
}
</script>
```

## 事件修饰符

​		`.stop`，`.prevent`，`.self`，`.capture`，`.once`，`.passive`

使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。因此使用 `@click.prevent.self` 会阻止**元素及其子元素的所有点击事件的默认行为**，而 `@click.self.prevent` 则只会阻止对元素本身的点击事件的默认行为。
