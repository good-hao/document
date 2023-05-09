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
    public void Create()
    {
        Entity en = new Entity();
        en["subject"] = "电子邮件测试";
        en["activityId"] = Guid.NewGuid();
        emailId = service.Create(en);
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
    /// 检查是否应该将传入电子邮件提升到 Microsoft Dynamics CRM 系统
    /// </summary>
    /// <param name="messageId">消息id</param>
    /// <param name="subject">主题</param>
    public void CheckPromoteEmail(string messageId,string subject)
    {
        CheckPromoteEmailRequest request = new CheckPromoteEmailRequest();
        request.MessageId = messageId;
        request.Subject = subject;
        CheckIncomingEmailResponse response = (CheckIncomingEmailResponse)service.Execute(request);
        int reasonCode = response.ReasonCode;
        bool shouldDeliver = response.ShouldDeliver;
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
    /// 获取用于对存储在 Microsoft Dynamics CRM 数据库中的用户或队列的电子邮件凭据进行加密或解密的密钥
    /// </summary>
    public void GetDecryptionKey()
    {
        GetDecryptionKeyRequest request = new GetDecryptionKeyRequest();
        GetDecryptionKeyResponse response = (GetDecryptionKeyResponse)service.Execute(request);
        string key = response.Key;
    }
 
    /// <summary>
    /// 删除电子邮件
    /// </summary>
    public void Delete()
    {
        service.Delete(entityName, emailId);
    }
}
```
