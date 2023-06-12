# TypeScript

## prototype属性

```ts
class employee{
    email: string|undefined
    constructor(public id:number,public name:string){
        this.id = id 
        this.name = name 
    }
}
var emp = new employee(123,"admin") 
console.log("员工号: "+emp.id + ";员工姓名: "+emp.name) 
employee.prototype.email = "admin@runoob.com" 
console.log("员工邮箱: "+emp.email)
```

## some

遍历数组，判断是否有满足条件的元素，如果有返回true,如果没有返回false 

```ts
var arr:number[] = [1, 2, 65, 23];
var blsome:boolean = arr.some(function(value, index, array) {
  console.log('每个数组元素' + value);
  console.log('每个数组元素的索引号' + index);
  console.log('数组本身' + array);
  return value < 15;
})
```

## every

检测该数组中每一个元素 是否都满足指定函数的条件

```ts
var arr:number[] = [1, 2, 65, 23];
var blevery:boolean = arr1.every(function(value) {
  return value > 40;
});
```

## map

生成一个新数组 其结果是该数组每一个元素 调用指定函数的返回值 如果给定是一个空数组，则返回true

```ts
var arr:number[] = [1, 2, 65, 23];
var blmap:number[] = arr.map(function(value) {
    return value*value;
})
```

## lastIndexOf

从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。

```
var str1 = new String( "strings" ); 
var index = str1.lastIndexOf( "s" );
console.log("lastIndexOf 查找到的最后字符串位置 :" + index ); // 6
```

## 数组迭代

```ts
var j:any; 
var nums:number[] = [101,1002,1003,111] 
for(j in nums) { 
    console.log(nums[j]) 
}
```

## interface接口

```ts
interface IPerson { 
    firstName:string,
    sayHi: ()=>string 
} 
var customer:IPerson = { 
    firstName:"Tom", 
    sayHi: ():string =>{return "Hi there"} 
} 
console.log(customer.firstName) 
console.log(customer.sayHi())  
interface iemployee extends IPerson{ 
    age:number
}
var employee:iemployee = { 
    age:11,
    firstName:"Tom",
    sayHi: ():string =>{return "Hi there"} 
}
console.log(employee.age)
```

## implements实现

```ts
interface ILoan { 
   interest:number 
} 
class AgriLoan implements ILoan { 
   interest:number 
   rebate:number 
   constructor(interest:number,rebate:number) { 
      this.interest = interest 
      this.rebate = rebate 
   } 
} 
var obj = new AgriLoan(10,1) 
console.log("利润为 : "+obj.interest+"，抽成为 : "+obj.rebate )
```



## static 关键字

```ts
class StaticMem {  
   static num:number; 
   static disp():void { 
      console.log("num 值为 "+ StaticMem.num) 
   } 
} 
StaticMem.num = 12     // 初始化静态变量
StaticMem.disp()       // 调用静态方法
```

## instanceof 运算符

instanceof 运算符用于判断对象是否是指定的类型，如果是返回 true，否则返回 false

```ts
class Person{ } 
var obj = new Person() 
var isPerson = obj instanceof Person; 
console.log("obj 对象是 Person 类实例化来的吗？ " + isPerson);
```

## 访问控制修饰符

- **public（默认）** : 公有，可以在任何地方被访问。
- **protected** : 受保护，可以被其自身以及其子类访问。
- **private** : 私有，只能被其定义所在的类访问。

## 对象

对象是包含一组键值对的实例。 值可以是标量、函数、数组、对象等

```ts
var object_name = { 
    k: "value1", // 标量
    e: function() {
        // 函数
    }, 
    y:["content1", "content2"] //集合
}
console.log(object_name.k)
console.log(object_name.y)
```

## export

如果我们需要在外部可以调用类和接口，则需要在类和接口添加 **export** 关键字。

## import

在另外一个文件使用模块就需要使用 **import** 关键字来导入

```
import name = require("./classname");
```

## 声明文件

```
//声明文件以 .d.ts 为后缀
test.d.ts
//声明文件或模块的语法格式
declare module Module_Name {}
//引入声明文件语法
/// <reference path = "test.d.ts" />
```

