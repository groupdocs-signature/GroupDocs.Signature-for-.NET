# to build the image run in PowerShell - `docker build --pull -t signature:examples .`
# to run the examples run in PowerShell - `docker run --rm -it -v ${PWD}:/examples/Results signature:examples`

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build_env

# prepare
WORKDIR /examples
COPY ./*.sln ./
COPY ./GroupDocs.Signature.Examples.CSharp/ ./GroupDocs.Signature.Examples.CSharp/
COPY ./GroupDocs.Signature.Examples.CSharp.Net10/ ./GroupDocs.Signature.Examples.CSharp.Net10/
# end prepare

# restore
RUN dotnet restore ./GroupDocs.Signature.Examples.CSharp.Net10/GroupDocs.Signature.Examples.CSharp.Net10.csproj
# end restore

# build
RUN dotnet publish ./GroupDocs.Signature.Examples.CSharp.Net10/GroupDocs.Signature.Examples.CSharp.Net10.csproj --no-restore --configuration Release -o /publish_output
# end build

FROM mcr.microsoft.com/dotnet/runtime:10.0

# libgdiplus for the image operations of GroupDocs.Signature on Linux, and the fonts the examples use
RUN apt-get update \
    && echo "ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true" | debconf-set-selections \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y libgdiplus libc6-dev fontconfig ttf-mscorefonts-installer \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /examples
COPY --from=build_env /publish_output .
ENTRYPOINT ["dotnet", "GroupDocs.Signature.Examples.CSharp.Net10.dll"]
