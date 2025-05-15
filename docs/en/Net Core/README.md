# .Net

## autofac 

```
//1、瞬时生命周期：注册之后，每次获取到的服务实例都不一样（默认的注册方式）
containerBuilder.RegisterType<UserService>().As<IUserService>().InstancePerDependency();
//2、单例生命周期：整个容器中获取的服务实例都是同一个
containerBuilder.RegisterType<UserService>().As<IUserService>().SingleInstance();
//3、作用域生命周期：在相同作用域下获取到的服务实例是相同的
containerBuilder.RegisterType<UserService>().As<IUserService>().InstancePerLifetimeScope();
//4、作用域生命周期：可以指定到某一个作用域，然后在相同作用域下共享服务实例
containerBuilder.RegisterType<UserService>().As<IUserService>().InstancePerMatchingLifetimeScope("My");
//5、http请求上下文的生命周期：在一次Http请求上下文中,共享一个组件实例。仅适用于asp.net mvc开发。
containerBuilder.RegisterType<UserService>().As<IUserService>().InstancePerRequest();
//6、拥有隐式关系类型的创建新的嵌套生命周期的作用域，在一个生命周期域中所拥有的实例创建的生命周期中，
//  每一个依赖组件或调用Resolve()方法创建一个单一的共享的实例，并且子生命周期域共享父生命周期域中的实例
containerBuilder.RegisterType<UserService>().InstancePerOwned<IUserService>(); 
```

## Swagger

勾选生成api

![](../images/1.jpg)

```
//代码
services.AddSwaggerGen(c =>
{
    // 加载主项目的XML注释文件
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});
```



## 前端到后端获取数据

```
//Content-Type: application/json
[HttpPost]
public async Task<IActionResult> YourAction()
{
    using var reader = new StreamReader(Request.Body);
    var bodyJson = await reader.ReadToEndAsync();
    var model = JsonSerializer.Deserialize<YourModel>(bodyJson);
    var id = model.Id;
    return Ok(id);
}

//Content-Type: application/x-www-form-urlencoded
//x-www-form-urlencoded 或 multipart/form-data 表单
[HttpPost]
public IActionResult YourAction()
{
    var id = Request.Form["id"];
    return Ok(id);
}


[HttpGet]
public IActionResult YourAction()
{
    var id = Request.Query["id"];
    return Ok(id);
}
```



## JsonNode 

```
JsonNode rootNode = JsonNode.Parse(json)
JsonNode jsonNode = rootNode["a1"]["a2"]["a3"]
string str = jsonNode.ToJsonString();
```

