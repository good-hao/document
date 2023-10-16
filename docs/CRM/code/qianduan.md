# CRM前端操作

## 取值

```js
//Xrm.Page = formContext
//字段取值
var obj = Xrm.Page.getAttribute(FieldName).getValue();
var obj = Xrm.Page.getControl(FieldName).getAttribute().getValue();
//获取当前 Entity Id
var entityId = Xrm.Page.data.entity.getId();
//获取当前 Entity 的 Name
var entityName = Xrm.Page.data.entity.getEntityName();
//获取当前 User Id 只能在表单或Web资源中使用
var userId = Xrm.Page.context.getUserId();
//获取当前 User Id 可以在任何地方使用
var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
//获取登录用户的用户名
Xrm.Page.context.getUserName()
Xrm.Utility.getGlobalContext().userSettings.userName
//获取登录用户的角色id
Xrm.Page.context.getUserRoles()
//获取当前页面所有赋值的字段的情况
console.log(Xrm.Page.data.entity.getDataXml());
//根据id查询表单中的数据
Xrm.WebApi.retrieveRecord("new_main", formContext.getAttribute("new_detail").getValue()[0].id.replace("{", "").replace("}", "").toLowerCase(),"?$select=new_main_field").then(
                        function success(result) {
                            console.log(result.new_main_field)
                        },
                        function (error) {
                            console.log(error.message);
                        }
                    );
//获取环境组织名称
Xrm.Utility.getGlobalContext().getOrgUniqueName()
```

## 赋值

```js
//一般类型
Xrm.Page.getAttribute(FieldName).setValue(object);
//OptionSet类型:
Xrm.Page.getAttribute(FieldName).setValue(1);//OptionSet的对应选项的Value
//Lookup类型
Xrm.Page.getAttribute(FieldName).setValue([{ id:"record id", name: "sValue", entityType: "Entity Name" }]);
//DateOnly类型
Xrm.Page.getAttribute(FieldName).setValue(new Date());
//给字段赋值后自动提交
Xrm.Page.getAttribute(FieldName).setSubmitMode("value")
```

## 错误提示

```js
//提示指定错误
Xrm.Page.getControl(FieldName).setNotification(ErrorMessage);
//清除错误提示
Xrm.Page.getConrol(FieldName).clearNotification();
```

## 字段操作

```js
//设置Read Only
Xrm.Page.getControl(FieldName).setDisabled(true);
//设置Enable
Xrm.Page.getControl(FieldName).setDisabled(false);
//设置必填 (required必填，recommended业务推荐)
Xrm.Page.getAttribute(FieldName).setRequiredLevel("required");
//设置可选
Xrm.Page.getAttribute(FieldName).setRequiredLevel("none");
//设置字段可见
Xrm.Page.getControl(FieldName).setVisible(true);
//隐藏字段
Xrm.Page.getControl(FieldName).setVisible(false);
//锁定字段 （页眉字段加header_）
Xrm.Page.getControl(FieldName).setDisabled(true);
//解锁字段
Xrm.Page.getControl(FieldName).setDisabled(false);
//设置聚焦
Xrm.Page.getControl(FieldName).setFocus()
//刷新单个字段
Xrm.Page.getAttribute(FieldName).fireOnChange()
//删除选项集中的选项
Xrm.Page.getControl(FieldName).removeOption("value")
//添加事件
Xrm.Page.getControl(FieldName).getAttribute().addOnChange(fnOnChange);
```

## Tab操作

```js
控制Tab是否可见
Xrm.Page.ui.tabs.get("tab_Name").setVisible(true);
//获取所有Tab
Xrm.Page.ui.tabs.getAll()
//获取Tab文本
Xrm.Page.ui.tabs.getByName("tabid").getLabel()
//设置Tab值
Xrm.Page.ui.tabs.getByName("tabid").setLabel("value")
//控制Section是否可见
Xrm.Page.ui.tabs.get("tab_Name").sections.get("section_name").setVisible(true);

```

##  表单操作

```js
//保存当前表单
Xrm.Page.data.entity.save();
//刷新表单
Xrm.Page.data.refresh();
//刷新视图
Mscrm.Utilities.refreshCurrentGrid(number);
//关闭当前页面
Xrm.Page.ui.close()
// 阻止当前页面保存
// 阻止当前页面保存，需要勾选 Pass execution context as first parameter(将执行上下文作为第一个参数传递)
function PageOnSave(exeContext){
    var formContext = exeContext.getFormContext();
    //Xrm.Page = formContext
}
exeContext.getEventArgs().preventDefault();
//显示进度对话框
Xrm.Utility.showProgressIndicator("正在执行...");
//关闭进度对话框
Xrm.Utility.closeProgressIndicator();
//弹出框
Xrm.Utility.alertDialog("请稍后重试。");
Xrm.Utility.alertDialog("保存成功。", function () {
  // 执行某些操作
});
parent.Xrm.Utility.alertDialog("这是一个嵌入式窗体中的警告消息。");
//获取当前表单名称
Xrm.Page.ui.formSelector.getCurrentItem().getLabel()
//判断当前 form 的状态
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

## 数据操作

```js
//实体后一定要加上“s”
var data =
{
    new_orderdetail_code: "test1001",
    "ownerid@odata.bind": "/systemusers(989bec9a-8b05-ec11-94ef-0017fa033334)"
}
//创建
function createDate() {
    Xrm.WebApi.createRecord("new_orderdetail", data).then(
        function success(result) {
            console.log("new_orderdetail created with ID: " + result.id);
        },
        function (error) {
            console.log(error.message);
        });
}

//实体后一定要加上“s”
data = {
    new_orderdetail_sort: 5,
    "new_orderdetail_order@odata.bind":"/new_orders(7f586ee6-d04d-ed11-bba0-0017fa04b2aa)"
}
//更新
function updateDate() {
    Xrm.WebApi.updateRecord("new_orderdetail", "bfb58195-205b-ed11-9561-0017fa04993b", data).then(
        function success(result) {
            console.log("new_orderdetail updated");
        },
        function (error) {
            console.log(error.message);
        }
    );
}
```

## 打开实体表单或创建表单

```js
//打开表单
Xrm.Utility.openEntityForm("entityname","entityid")
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

## 打开确认对话框

```js
var confirmStrings = { text:"确定删除吗?", title:"窗体", subtitle:"This action cannot be undone." };
var confirmOptions = { height: 200, width: 450 };
Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    function (success) {
        if (success.confirmed) {
            // User confirmed the action
        } else {
            // User cancelled the action
        }
    },
    function (error) {
        console.log(error.message);
    }
);

```



## 子网格操作

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

//不需要转到明细页面
var entityId = Xrm.Page.data.entity.getId();//实体的Id
var subGridentityName = "明细的实体名";
var subGridFieldName = "明细的字段，与主表关联的字段";
var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
                "  <entity name='" + subGridentityName + "'>" +
                "    <all-attributes />" + //查询所有字段
    			//"      <attribute name='查询的字段名' />" +
                "    <filter type='and'>" +
                "<condition attribute='" + subGridFieldName + "' operator='eq' value='" + entityId + "' />" +
                "    </filter>" +
                "  </entity>" +
                "</fetch>";

Xrm.WebApi.retrieveMultipleRecords(subGridentityName, "?fetchXml=" + encodeURIComponent(fetchXml)).then(
    function success(results) {
        console.log("sucess");
    },
    function (error) {
        console.log(error.message);
    }
);
```

## 打开查找控件

```javascript
var lookupOptions =
{
  defaultEntityType: "account",
  entityTypes: ["account"],
  allowMultiSelect: false,
  defaultViewId: "0D5D377B-5E7C-47B5-BAB1-A5CB8B4AC10",
  viewIds: ["0D5D377B-5E7C-47B5-BAB1-A5CB8B4AC10", "00000000-0000-0000-00AA-000010001003"],
  searchText: "Allison",
  filters: [{ filterXml: "<filter type='or'><condition attribute='name' operator='like' value='A%' /></filter>", entityLogicalName: "account" }]
};

Xrm.Utility.lookupObjects(lookupOptions).then(
  function (success) {
    console.log(success);
  },
  function (error) {
    console.log(error);
  }
);
//参考 https://learn.microsoft.com/zh-cn/power-apps/developer/model-driven-apps/clientapi/reference/xrm-utility/lookupobjects
```

## 使用接口

```javascript
var actionName = "new_customaction";
var parameters = {
  "param1": "value1",
  "param2": 2
};
var parameterTypes = {
  "param1": "Edm.String",
  "param2": "Edm.Int32"
};
//如果执行的自定义动作不绑定到特定实体记录，而是作为全局动作执行，则不需要提供 boundParameter 参数
var boundParameter = {
  "entityName": "account",
  "entityId": "00000000-0000-0000-0000-000000000001"
};
Xrm.WebApi.online.execute(actionName, parameters, parameterTypes, boundParameter).then(
  function (response) {
    // 处理自定义动作执行的响应
    console.log(response);
  },
  function (error) {
    // 处理自定义动作执行过程中的错误
    console.log(error);
  }
);
```

