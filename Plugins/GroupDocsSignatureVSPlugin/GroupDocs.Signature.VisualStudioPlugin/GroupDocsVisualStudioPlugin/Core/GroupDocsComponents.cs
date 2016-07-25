// Copyright (c) Aspose 2002-2016. All Rights Reserved.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace GroupDocsSignatureVisualStudioPlugin.Core
{
    public class GroupDocsComponents
    {
        public static Dictionary<String, GroupDocsComponent> list = new Dictionary<string, GroupDocsComponent>();
        public GroupDocsComponents()
        {
            list.Clear();

            GroupDocsComponent groupdocsSignature = new GroupDocsComponent();
            groupdocsSignature.set_downloadUrl("");
            groupdocsSignature.set_downloadFileName("groupdocs.signature.zip");
            groupdocsSignature.set_name(Constants.GROUPDOCS_COMPONENT);
            groupdocsSignature.set_remoteExamplesRepository("https://github.com/groupdocs-signature/GroupDocs.Signature-for.NET.git");
            list.Add(Constants.GROUPDOCS_COMPONENT, groupdocsSignature);
        }
    }
}
