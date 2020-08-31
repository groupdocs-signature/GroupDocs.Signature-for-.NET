---
id: evaluation-limitations-and-licensing-of-groupdocs-signature
url: signature/net/evaluation-limitations-and-licensing-of-groupdocs-signature
title: Evaluation Limitations and Licensing of GroupDocs.Signature
weight: 5
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="info" >}}
You can use GroupDocs.Signature without the license. The usage and functionalities are pretty much same as the licensed one but you will face few limitations while using the non-licensed API.
{{< /alert >}}

## Evaluation Limitations

You can easily download GroupDocs.Signature for evaluation. The evaluation download is the same as the purchased download. The evaluation version simply becomes licensed when you add a few lines of code to apply the license. You will face following limitations while using the API without the license:

* Only first 2 pages are processed.
* Trial badges are placed in the document on the top of each page.

## Licensing

The license file contains details such as the product name, number of developers it is licensed to, subscription expiry date and so on. It contains the digital signature, so don't modify the file. Even inadvertent addition of an extra line break into the file will invalidate it. You need to set a license before utilizing GroupDocs.Signature API if you want to avoid its evaluation limitations.
The license can be loaded from a file or stream object. The easiest way to set a license is to put the license file in the same folder as the GroupDocs.Signature.dll file and specify the file name, without a path, as shown in the examples below.

### Setting License from File

The code below will explain how to set product license.

```csharp
// For complete examples and data files, please go to https://github.com/groupdocs-Signature/GroupDocs.Signature-for-.NET
// Setup license.
License license = new License();
license.SetLicense(licensePath);
```

#### Setting License from Stream

The following example shows how to load a license from a stream.

```csharp
// For complete examples and data files, please go to https://github.com/groupdocs-Signature/GroupDocs.Signature-for-.NET
using (FileStream fileStream = File.OpenRead("GroupDocs.Signature.lic"))
{
    License license = new License();
    license.SetLicense(fileStream);
}
```

{{< alert style="info" >}}
Calling License.SetLicense multiple times is not harmful but simply wastes processor time. If you are developing a Windows Forms or console application, call License.SetLicense in your startup code, before using GroupDocs.Signature classes.
When developing an ASP.NET application, you can call License.SetLicense from the Global.asax.cs (Global.asax.vb) file in the Application\_Start protected method. It is called once when the application starts.  
Do not call License.SetLicense from within Page\_Load methods since it means the license will be loaded every time a web page is loaded.
{{< /alert >}}

#### Setting Metered License

{{< alert style="info" >}}
You can also set [Metered](https://apireference.groupdocs.com/net/signature/groupdocs.signature/metered) license as an alternative to license file. It is a new licensing mechanism that will be used along with existing licensing method. It is useful for the customers who want to be billed based on the usage of the API features. For more details, please refer to [Metered Licensing FAQ](https://purchase.groupdocs.com/faqs/licensing/metered) section.
{{< /alert >}}
Here are the simple steps to use the `Metered` class.

1. Create an instance of `Metered` class.
2. Pass public & private keys to `SetMeteredKey` method.
3. Do processing (perform task).
4. Call method `GetConsumptionQuantity` of the `Metered` class.
5. It will return the amount/quantity of API requests that you have consumed so far.
6. Call method `GetConsumptionCredit` of the `Metered` class.
7. It will return the credit that you have consumed so far.

Following is the sample code demonstrating how to use `Metered` class.

```csharp
// For complete examples and data files, please go to https://github.com/groupdocs-Signature/GroupDocs.Signature-for-.NET
string publicKey = ""; // Your public license key
string privateKey = ""; // Your private license key

Metered metered = new Metered();
metered.SetMeteredKey(publicKey, privateKey);

// Get amount (MB) consumed
decimal amountConsumed = GroupDocs.Signature.Metered.GetConsumptionQuantity();
Console.WriteLine("Amount (MB) consumed: " + amountConsumed);

// Get count of credits consumed
decimal creditsConsumed = GroupDocs.Signature.Metered.GetConsumptionCredit();
Console.WriteLine("Credits consumed: " + creditsConsumed);
```
