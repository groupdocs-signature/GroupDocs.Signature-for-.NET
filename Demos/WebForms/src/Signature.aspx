<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Signature.aspx.cs" Inherits="GroupDocs.Signature.WebForms.Signature" %>

<%
    GroupDocs.Signature.WebForms.Products.Common.Config.GlobalConfiguration config = new GroupDocs.Signature.WebForms.Products.Common.Config.GlobalConfiguration();
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
    <title>Signature for .NET WebForms</title>
    <link rel="icon" type="image/x-icon" href="resources/signature/favicon.ico" />
</head>
<body>
    <client-root></client-root>
    <script src="resources/signature/runtime-es2015.js" type="module"></script>
    <script src="resources/signature/runtime-es5.js" nomodule></script>
    <script src="resources/signature/polyfills-es2015.js" type="module"></script>
    <script src="resources/signature/polyfills-es5.js" nomodule></script>
    <script src="resources/signature/styles-es2015.js" type="module"></script>
    <script src="resources/signature/styles-es5.js" nomodule></script>
    <script src="resources/signature/vendor-es2015.js" type="module"></script>
    <script src="resources/signature/vendor-es5.js" nomodule></script>
    <script src="resources/signature/main-es2015.js" type="module"></script>
    <script src="resources/signature/main-es5.js" nomodule></script>
</body>
</html>

