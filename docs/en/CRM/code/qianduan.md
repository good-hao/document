# zCRM前端操作

## 取值

```js
var obj = Xrm.Page.getAttribute(FieldName).getValue();

var obj = Xrm.Page.getControl(FieldName).getAttribute().getValue();
```

## 赋值

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

 阻止当前页面保存，需要勾选 Pass execution context as first parameter(将执行上下文作为第一个参数传递)

```js
function PageOnSave(exeContext){
    var formContext = exeContext.getFormContext();
    //Xrm.Page = formContext
}
exeContext.getEventArgs().preventDefault();
```

 保存当前表单

```js
Xrm.Page.data.entity.save();
```

刷新表单

```js
Xrm.Page.data.refresh();
```

刷新视图

```js
Mscrm.Utilities.refreshCurrentGrid(etc number);//在新窗口中打开表单时，完整url中包含该值。
```

打开实体窗体或创建窗体

```js
//Xrm.Navigation.openForm({ "entityName": "entityName", "entityId": "entityId" });
Xrm.Navigation.openForm(entityFormOptions,formParameters).then(//entityFormOptions必填
    function (success) {
        console.log(success);
    },
    function (error) {
        console.log(error);
    });
//参考：https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-navigation/openform
```

子网格操作

```js
//获取的为当前页面所勾选的子网格信息
var rows = Xrm.Page.getControl("子网格名称").getGrid().getSelectedRows();
//获取所有行
var rows = Xrm.Page.getControl("子网格名称").getGrid().getRows();
rows.forEach(function (row, i) {
//将子网格中字段名为以下操作中的名称的值全部循环出来
    var new_stuachievement = row2.get(i).getData().getEntity().attributes.get("new_stuachievement").getValue();
    var new_name = row2.get(i).getData().getEntity().attributes.get("new_name").getValue();
    var new_stuclass = row2.get(i).getData().getEntity().attributes.get("new_stuclass").getValue();
});
```

打开查找控件

```js
var lookupOptions = 
{
  defaultEntityType: "account",
   entityTypes: ["account"],
  allowMultiSelect: false,
   defaultViewId:"0D5D377B-5E7C-47B5-BAB1-A5CB8B4AC10",
   viewIds:["0D5D377B-5E7C-47B5-BAB1-A5CB8B4AC10","00000000-0000-0000-00AA-000010001003"],
   searchText:"Allison",
   filters: [{filterXml: "<filter type='or'><condition attribute='name' operator='like' value='A%' /></filter>",entityLogicalName: "account"}]
};

Xrm.Utility.lookupObjects(lookupOptions).then(
  function(success){
console.log(success);},
function(error){console.log(error);});
//参考 https://learn.microsoft.com/zh-cn/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/lookupobjects
```

