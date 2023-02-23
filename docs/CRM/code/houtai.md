# CRM后台操作

## 取值和赋值

```c#
//创建实体
Entity _entity=new Entity("salesorder");

1.十进制数
取值：
var _typeDecimal=_entity.GetAttributeValue<decimal>("unitprice");
赋值：
_entity["unitprice"]=decimal.parse(19);

2.浮点数
取值：
var _typeDouble=_entity.GetAttributeValue<double>("unitprice");
赋值：
_entity["unitprice"]=double.parse(19);

3.整数
取值：
var _typeInt=_entity.GetAttributeValue<int>("unitprice");
赋值：
_entity["unitprice"]=19;

4.货币
取值：
var _typeMoney=_entity.GetAttributeValue<Money>("unitprice");
赋值：
_entity["unitprice"]=new Money(12);

5.选项集
取值：
var _typeOptionSetValue=_entity.GetAttributeValue<OptionSetValue>("otype");
赋值：
_entity["otype"]=new OptionSetValue(10);

6.两个选项
取值：
var _typeBool=_entity.GetAttributeValue<bool>("isok");
赋值：
_entity["isok"]=false;

7.时间
取值：
var _typeDateTime=_entity.GetAttributeValue<DateTime>("createdon");
赋值：
_entity["createdon"]=new DateTime().Now;

8.查找(LookUp)类型
取值：
var _typeEntityReference=_entity.GetAttributeValue<EntityReference>("createby");
赋值：
_entity["createby"]=new EntityReference("systemuser",userId);

9.文本
取值：
var _typeString=_entity.GetAttributeValue<string>("name");
赋值：
_entity["name"]="Jack";

10.状态
取值：
var _typeOptionSetValue=_entity.GetAttributeValue<OptionSetValue>("status");
赋值：
_entity["name"]=new OptionSetValue(10);
```

