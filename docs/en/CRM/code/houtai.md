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

11.获取数据
Entity entity = service.Retrieve(entityName, entityId, new ColumnSet(true));
```



## 查询数据

```C#
//查询表达式（QueryExpression）
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

// 创建组织服务对象
IOrganizationService service = new OrganizationServiceProxy(...);
// 实体名称
string entityName = "account";
// 构建查询表达式
QueryExpression query = new QueryExpression(entityName)
{
    ColumnSet = new ColumnSet(true),
    //ColumnSet = new ColumnSet("fieldname1", "fieldname2", "fieldname3"),
    //Criteria = new FilterExpression
    //{
    //    Conditions =
    //    {
    //        // 添加过滤条件
    //        new ConditionExpression("name", ConditionOperator.Equal, "条件值")
    //    }
   // }
};
// 执行查询
EntityCollection results = service.RetrieveMultiple(query);
// 处理查询结果
foreach (Entity entity in results.Entities)
{
    // 处理每个实体的数据
    if (entity.Contains("fieldname1"))
    {
        var fieldValue1 = entity["fieldname1"];
        // 处理字段1的值
    }
}


//使用 FetchXML 
// 创建组织服务对象
IOrganizationService service = new OrganizationServiceProxy(...);
// 实体名称
string entityName = "account";
// 构建 FetchXML 查询
string fetchXml = $@"
<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
    <entity name='{entityName}'>
        <all-attributes />
        //<attribute name='fieldname1' />
        //<attribute name='fieldname2' />
        //<attribute name='fieldname3' />
        //<filter type='and'>
        //    <condition attribute='name' operator='eq' value='条件值' />
        //</filter>
    </entity>
</fetch>";
// 执行 FetchXML 查询
EntityCollection results = service.RetrieveMultiple(new FetchExpression(fetchXml));
// 处理查询结果
foreach (Entity entity in results.Entities)
{
    // 处理每个实体的数据
    if (entity.Contains("fieldname1"))
    {
        var fieldValue1 = entity["fieldname1"];
        // 处理字段1的值
    }
}

```

## 更新数据

```c#
// 创建组织服务对象
IOrganizationService service = new OrganizationServiceProxy(...);
// 实体名称
string entityName = "account";
// 要更新的实体的唯一标识符（Guid）
Guid entityId = new Guid("实体的唯一标识符");
// 构建查询表达式以检索要更新的实体
ColumnSet columnsToUpdate = new ColumnSet("name", "telephone1");
Entity retrievedEntity = service.Retrieve(entityName, entityId, columnsToUpdate);
// 更新实体的属性值
retrievedEntity["name"] = "新的名称";
retrievedEntity["telephone1"] = "新的电话号码";
// 使用 Update 方法保存更改
service.Update(retrievedEntity);
```



##  抛出异常

```
//插件运行的错误会被写入System job
try
{
   
}
catch (FaultException ex)
{
    throw new InvalidPluginExecutionException(ex.Message);
}

```



## 发送邮件

```c#
using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Query;
/// <summary>
/// 电子邮件
/// </summary>
public class EmailHelper
{
    public static readonly string entityName = "email";
    public Guid emailId = Guid.Empty;
    public IOrganizationService service;
 
    /// <summary>
    /// 创建电子邮件
    /// </summary>
    public static Guid CreateEmailRecord(IOrganizationService service, EntityCollection ccEntities, EntityCollection toEntities, string subject="主题" ,string emailMessage="内容")
        {
            Entity email = new Entity("email");
            Entity fromParty = new Entity("activityparty");
            string guid = GetConfigurationValue(service, "SystemUser_SendEmail");//发送人的guid
            fromParty["partyid"] = new EntityReference("systemuser", new Guid(guid));

            Entity[] entities = new Entity[toEntities.Entities.Count];
            Entity[] ccentities = new Entity[ccEntities.Entities.Count];

            for (int i = 0; i < toEntities.Entities.Count; i++)
            {
                Entity toParty = new Entity("activityparty");
                //toParty["partyid"] = new EntityReference(toEntities.Entities[i].LogicalName, toEntities.Entities[i].Id);
                toParty["addressused"] = GetEmail(service, toEntities.Entities[i].Id);//收件人的邮箱
                entities[i] = toParty;
            }
            for (int i = 0; i < ccEntities.Entities.Count; i++)
            {
                Entity ccParty = new Entity("activityparty");
                //ccParty["partyid"] = new EntityReference(ccEntities.Entities[i].LogicalName, ccEntities.Entities[i].Id);
                ccParty["addressused"] = GetEmail(service, ccEntities.Entities[i].Id);
                ccentities[i] = ccParty;
            }
            email["from"] = new Entity[] { fromParty };
            email["to"] = entities;
            if (ccentities.Length > 0)
                email["cc"] = ccentities;
            email["subject"] = subject;
            email["directioncode"] = true;
            email["description"] = emailMessage;

            return service.Create(email);
        }
    
    /// <summary>
    /// 发送电子邮件
    /// </summary>
    public void SendEmail()
    {
        SendEmailRequest request = new SendEmailRequest();
        request.EmailId = emailId;
        request.IssueSend = true;
        request.TrackingToken = "";
        SendEmailResponse response = (SendEmailResponse)service.Execute(request);
        string subject = response.Subject;
    }

    /// <summary>
    /// 异步发送电子邮件
    /// </summary>
    /// <param name="query">查询的条件</param>
    public void BackgroundSendEmail(QueryBase query)
    {
        BackgroundSendEmailRequest request = new BackgroundSendEmailRequest();
        request.Query = query;
        BackgroundSendEmailResponse response = (BackgroundSendEmailResponse)service.Execute(request);
        EntityCollection entityCollection = response.EntityCollection;
        bool[] hasAttachments = response.HasAttachments;
    }
 
    /// <summary>
    /// 发送批量电子邮件
    /// </summary>
    /// <param name="query">查询的条件</param>
    /// <param name="templateId">模版id</param>
    public void SendBulkMail(QueryBase query,Guid templateId)
    {
        WhoAmIRequest emailSenderRequest = new WhoAmIRequest();
        WhoAmIResponse emailSenderResponse = service.Execute(emailSenderRequest) as WhoAmIResponse;
        SendBulkMailRequest request = new SendBulkMailRequest();
        request.Query = query;
        request.Sender = new EntityReference() { LogicalName = "systemuser", Id = emailSenderResponse.UserId };
        request.RequestId = Guid.Empty;
        request.RegardingType = "systemuser";
        request.TemplateId = templateId;
        SendBulkMailResponse response = (SendBulkMailResponse)service.Execute(request);
    }
 
    /// <summary>
    /// 使用模板发送电子邮件
    /// </summary>
    /// <param name="userId">发送人，用户id</param>
    /// <param name="contractId">接收人，联系人id</param>
    /// <param name="templateId">模版id</param>
    public void SendEmailFromTemplate(Guid userId, Guid contractId, Guid templateId)
    {
        Entity fromEn = new Entity() { LogicalName = "systemuser",Id = userId };
        Entity toEn = new Entity() { LogicalName = "contract", Id = contractId };
        Entity emailEn = new Entity() { LogicalName = entityName };
        emailEn["from"] = new Entity[] { fromEn };
        emailEn["to"] = new Entity[] { toEn };
        emailEn["subject"] = "电子邮件发送测试";
        emailEn["directioncode"] = true;
        SendEmailFromTemplateRequest request = new SendEmailFromTemplateRequest();
        request.Target = emailEn;
        request.TemplateId = templateId;
        request.RegardingId = contractId;
        request.RegardingType = "contract";
        SendEmailFromTemplateResponse response = (SendEmailFromTemplateResponse)service.Execute(request);
        Guid id = response.Id;
    }
 
    /// <summary>
    /// 删除电子邮件
    /// </summary>
    public void Delete()
    {
        service.Delete(entityName, emailId);
    }
    
    sendemail()
    {
        string smtpServer = "smtp.qiye.aliyun.com";
        int smtpPort = 25;
        string smtpUserName = "messengers@c-denkei.com";
        string smtpPassword = "ZuDjFM!9GgbW1";
        var smtpClient = new SmtpClient(smtpServer, smtpPort);
        smtpClient.UseDefaultCredentials = false;
        smtpClient.Credentials = new NetworkCredential(smtpUserName, smtpPassword);
        smtpClient.EnableSsl = true;
        var mail = new MailMessage();
        mail.From = new MailAddress(smtpUserName);
        mail.Subject = subject;
        mail.Body = emailMessage;
        mail.IsBodyHtml = true;
        smtpClient.Send(mail);
    }
    
}
```
