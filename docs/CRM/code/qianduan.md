# CRM前端操作

## 取值：

```js
var obj = Xrm.Page.getAttribute(FieldName).getValue();

var obj = Xrm.Page.getControl(FieldName).getAttribute().getValue();
```

## 赋值：

```js
一般类型：
Xrm.Page.getAttribute(FieldName).setValue(object);

OptionSet类型: 
Xrm.Page.getAttribute(FieldName).setValue(1);//OptionSet的对应选项的Value

Lookup类型:
Xrm.Page.getAttribute(FieldName).setValue([{ id:"record id", name: "sValue", entityType: "Entity Name" }]);

DateOnly类型:
Xrm.Page.getAttribute(FieldName).setValue(new Date());
```

提示指定错误：

```js
Xrm.Page.getControl(FieldName).setNotification(ErrorMessage);
```

清除错误提示：

```js
Xrm.Page.getConrol(FieldName).clearNotification();
```

设置Read Only：

```js
Xrm.Page.getControl(FieldName).setDisabled(true);
```

设置Enable：

```js
Xrm.Page.getControl(FieldName).setDisabled(false);
```

控制Tab是否可见：

```js
Xrm.Page.ui.tabs.get("tab_Name").setVisible(true);
```

控制Section是否可见：

```js
Xrm.Page.ui.tabs.get("tab_Name").sections.get("section_name").setVisible(true);
```

设置必填：

```js
Xrm.Page.getAttribute(FieldName).setRequiredLevel("required");
```

设置可选：

```js
Xrm.Page.getAttribute(FieldName).setRequiredLevel("none");
```

设置字段可见：

```js
Xrm.Page.getControl(FieldName).setVisible(true);
```

隐藏字段：

```js
Xrm.Page.getControl(FieldName).setVisible(false);
```

获取当前 Entity Id：

```js
var entityId = Xrm.Page.data.entity.getId();
```

获取当前 Entity 的 Name：

```js
var entityName = Xrm.Page.data.entity.getEntityName();
```

获取当前 User Id：

```js
var userId = Xrm.Page.context.getUserId();
```

判断当前 form 的状态：

```js
if (Xrm.Page.ui.getFormType() == 1){
    //1:Create
}
else{
    //0:Undefined
    //2:Update
    //3:Read Only
    //4:Disabled
    //6:Bulk Edit
}
```

添加事件：

```js
Xrm.Page.getControl(FieldName).getAttribute().addOnChange(fnOnChange);
```

获取当前页面所有赋值的字段的情况：

```js
console.log(Xrm.Page.data.entity.getDataXml());
```

 阻止当前页面保存，需要勾选 Pass execution context as first parameter

```js
exeContext.getEventArgs().preventDefault();
```

 