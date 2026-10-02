# GroupDocs.Signature for .NET Examples

This package contains C# Example Project for [GroupDocs.Signature for .NET](https://products.groupdocs.com/signature/net) and sample input templates used in the examples.

<p align="center">
  <a title="Download complete GroupDocs.Signature for .NET Example source code" href="https://github.com/groupdocs-signature/GroupDocs.Signature-for-.NET/archive/master.zip">
	<img src="https://raw.github.com/AsposeExamples/java-examples-dashboard/master/images/downloadZip-Button-Large.png" />
  </a>
</p>

## Projects

The example code is in the shared project `GroupDocs.Signature.Examples.CSharp`. It is run by one console project per supported framework:

| Project | Target framework |
| --- | --- |
| `GroupDocs.Signature.Examples.CSharp.Framework` | .NET Framework 4.6.2 |
| `GroupDocs.Signature.Examples.CSharp.Net` | .NET 6 |
| `GroupDocs.Signature.Examples.CSharp.Net8` | .NET 8 |
| `GroupDocs.Signature.Examples.CSharp.Net10` | .NET 10 |

`RunExamples.cs` in each project lists the examples to run. Set `LicensePath` in `Constants.cs` to your license file; without a license the examples run in evaluation mode.

## How to Run the Examples in Visual Studio?

Follow the given steps to proceed with project build:

* Extract the downloaded project and open the solution file in Visual Studio
* Set the project for your framework as the startup project
* Build and run the project

In other case, it is possible that Visual Studio is unable to automatically add APIs references due to Visual Studio version differences. In this case, please add references of missing APIs manually.

## How to Run the Examples with the .NET CLI?

The examples read the sample files relative to the output folder, so run them from there:

```bash
dotnet build GroupDocs.Signature.Examples.CSharp.Net10 --configuration Release
cd GroupDocs.Signature.Examples.CSharp.Net10/bin/Release/net10.0
dotnet GroupDocs.Signature.Examples.CSharp.Net10.dll
```

On Linux and macOS, GroupDocs.Signature uses System.Drawing (libgdiplus) for some image operations. Install libgdiplus and the Microsoft core fonts, as the Dockerfile does. The .NET projects already set the `System.Drawing.EnableUnixSupport` switch that this needs.

## How to Run the Examples in Docker container?

The Docker image runs the .NET 10 project on Linux.

* Navigate into Examples directory
* Build an image
  `docker build --pull -t signature:examples .`
* Run a container
  * Windows Command Line (CMD): `docker run --rm -it -v %cd%:/examples/Results signature:examples`
  * Powershell: `docker run --rm -it -v ${PWD}:/examples/Results signature:examples`
  * On Linux: `docker run --rm -it -v $(pwd):/examples/Results signature:examples`

For more details, visit [How to Run Examples](https://docs.groupdocs.com/signature/net/how-to-run-examples/).
