---
id: how-to-run-examples
url: signature/net/how-to-run-examples
title: How to Run Examples
weight: 6
description: ""
keywords: 
productName: GroupDocs.Signature for .NET
hideChildren: False
---
{{< alert style="warning" >}}Before running an example make sure that GroupDocs.Signature has been installed successfully.{{< /alert >}}

We offer multiple solutions on how you can run GroupDocs.Signature examples, by building your own or using our back-end or front-end examples out-of-the-box.

Please choose one from the following list:

## Build project from scratch

* Open Visual Studio and go to **File** -> **New** -> **Project**.
* Select appropriate project type - Console App, ASP.NET Web Application etc.
* Install **GroupDocs.Signature for .NET** from Nuget or official GroupDocs website following this [guide]({{< ref "signature/net/getting-started/installation.md" >}}).
* Code your first application with **GroupDocs.Signature for .NET** like this

    ```csharp
    // The path to the documents directory.
    string filePath = @"C:\sample.docx"; // NOTE: Put here actual path for your document
    string fileName = Path.GetFileName(filePath);
    string outputFilePath = Path.Combine(@"C:\output", fileName);

    // Sign document with text signature.
    using (Signature signature = new Signature(filePath))
    {
        TextSignOptions textSignOptions = new TextSignOptions("John Smith");
        signature.Sign(outputFilePath, textSignOptions);
    }
    ```

* Build and Run your project.
* Signed document will appear inside "*C:\\output\\"* directory.

## Run back-end examples

The complete examples package of **GroupDocs.Signature** is hosted on [GitHub](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET). You can either download the ZIP file from [here](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET/archive/master.zip) or clone the repository of GitHub using your favourite git client.  
In case you download the ZIP file, extract the folders on your local disk. The extracted files and folders will look like following image:

![HowToRun](signature/net/images/how-to-run-examples.png)

In extracted files and folders, you can find CSharp solution file. The project is created in **Microsoft Visual Studio 2019**. The **Resources** folder contains all the sample document and image files used in the examples.  
To run the examples, open the solution file in Visual Studio and build the project. To add missing references of **GroupDocs.Signature** see [Development Environment, Installation and Configuration]({{< ref "signature/net/getting-started/installation.md" >}}). All the functions are called from **RunExamples.cs**.
Un-comment the function you want to run and comment the rest.

![HowToRun](signature/net/images/how-to-run-examples_1.png)

## Run MVC examples

You can run [GroupDocs.Signature for .NET MVC Example](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-MVC) following these steps:

* Download [source code](https://github.com/groupdocs-signature/GroupDocs.https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-MVC-for-.NET-MVC/archive/master.zip) from GitHub or clone this repository

    ```csharp
    git clone https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-MVC
    ```

* Open solution in the VisualStudio. Update common parameters in **web.config** and example related properties in the **configuration.yml** to meet your requirements.
* Open [http://localhost:8080/signature](http://localhost:8080/signature) in your favorite browser

For more details about project configuration please refer to this [guide](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-MVC#configuration).

## Run WebForms examples

You can run [GroupDocs.Signature for .NET Web.Forms Example](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-WebForms) following these steps:

* Download [source code](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-WebForms/archive/master.zip) from GitHub or clone this repository

    ```csharp
    git clone https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-WebForms
    ```

* Open solution in the VisualStudio. Update common parameters in **web.config** and example related properties in the **configuration.yml** to meet your requirements.
* Open [http://localhost:8080/signature](http://localhost:8080/signature) in your favorite browser

For more details about project configuration please refer to this [guide](https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET-WebForms#configuration).

## Run from Docker

Use [Docker](https://www.docker.com/) image to try GroupDocs.Signature for .NET features in an easy way. Here are the command to run GroupDocs.Signature for .NET from docker image.

```csharp
mkdir DocumentSamples
mkdir Licenses
docker run -p 8080:8080 --env application.hostAddress=localhost -v `pwd`/DocumentSamples:/home/groupdocs/app/DocumentSamples -v `pwd`/Licenses:/home/groupdocs/app/Licenses groupdocs/signature
## Open http://localhost:8080/signature in your favorite browser.
```

## Contribute

If you like to add or improve an example, we encourage you to contribute to the project. All examples in this repository are open source and can be freely used in your own applications.  
To contribute, you can fork the repository, edit the code and create a pull request. We will review the changes and include it in the repository if found helpful.
