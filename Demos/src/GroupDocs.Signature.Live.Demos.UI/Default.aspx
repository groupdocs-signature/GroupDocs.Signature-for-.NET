<%@ Page Title="Free online document signature for DOC, DOCX, PDF, XLSX, PPTX and other formats" MetaDescription="Sign documents in many formats, DOC, DOCX, PDF, XLSX, PPTX and other formats" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="GroupDocs.Signature.Live.Demos.UI.Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>

            <div class="container-fluid GroupDocsApps">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 pt-5 pb-5">
                            <h1 id="hheading" runat="server">Free Online Document Signature</h1>
                            <h4 id="hdescription" runat="server">Sign Word, Excel, PowerPoint, PDF and other types of documents</h4>							
                            <div class="form">

                                <asp:PlaceHolder ID="ConvertPlaceHolder" runat="server">
                                    <div class="uploadfile">
                                        <div class="filedropdown">
                                            <p runat="server" id="pMessage"></p>
                                            <asp:HiddenField ID="hfToFormat" Value="~" runat="server" />

                                            <div class="saveas" style="margin-top: 25px">
                                                <em>Sign with</em>
                                                <div class="btn-group saveformat">
                                                    <asp:DropDownList ID="ddlTo" CssClass="btn" runat="server" onchange="OnDdlToChange()">
                                                    </asp:DropDownList>
                                                </div>
                                            </div>                                                                                                                                  

                                            <div id="SignWithText">
                                                <div class="watermark" style="margin-top: 25px" runat="server">
                                                    <textarea id="txtSignValue" runat="server" class="form-control" aria-describedby="basic-addon2" maxlength="25"></textarea>
                                                </div>
                                            </div>
                                            <div id="SignWithImage">
                                                <div class="filedrop" style='margin-top: 25px; background-image: none; padding-top: 30px'>
                                                    <label class="dz-message needsclick" style='font-size: 14px'>Upload Image signature file</label>
                                                    <input type="file" name="UploadFile2" id="UploadFile2" runat="server" class="uploadfileinput" />
                                                    <asp:RegularExpressionValidator ID="ValidateFileType2" ValidationExpression="([a-zA-Z0-9\s)\s(\s_\\.\-:])+(.doc|.docx|.dot|.dotx|.rtf)$"
                                                        ControlToValidate="UploadFile2" runat="server" ForeColor="Red"
                                                        Display="Dynamic" />
                                                    <asp:HiddenField ID="hdnFileExtensionMessage2" runat="server" />
                                                    <div class="fileupload2">
                                                        <span class="filename">
                                                            <a href="#">
                                                                <label for="uploadfileinput" id="lblFilename2" class="custom-file-upload"></label>
                                                            </a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="filedrop">
                                                <label class="dz-message needsclick"><%=Resources["DropOrUploadFile"]%></label>
                                                <input type="file" name="UploadFile" id="UploadFile" runat="server" class="uploadfileinput" />
                                                <asp:RegularExpressionValidator ID="ValidateFileType" ValidationExpression="([a-zA-Z0-9\s)\s(\s_\\.\-:])+(.doc|.docx|.dot|.dotx|.rtf)$"
                                                    ControlToValidate="UploadFile" runat="server" ForeColor="Red"
                                                    Display="Dynamic" />
                                                <asp:HiddenField ID="hdnFileExtensionMessage" runat="server" />
                                                <div class="fileupload">
                                                    <span class="filename">
                                                        <a href="#">
                                                            <label for="uploadfileinput" id="lblFilename" class="custom-file-upload"></label>
                                                        </a>
                                                    </span>
                                                </div>
                                            </div>

                                             <div class="saveas">
                                                <em>Sign Location</em>
                                                <div class="btn-group saveformat">
                                                    <asp:DropDownList ID="ddlLocation" CssClass="btn" runat="server">
                                                    </asp:DropDownList>
                                                </div>
                                                <em>Sign Size</em>
                                                <div class="btn-group saveformat">
                                                    <asp:DropDownList ID="ddlSize" CssClass="btn" runat="server">
                                                    </asp:DropDownList>
                                                </div>
                                            </div>

                                            <div class="convertbtn" style="display: block;margin-top: 35px">
                                                <asp:Button runat="server" ID="btnSign" class="btn btn-success btn-lg" Text="SIGN NOW" OnClick="btnSign_Click" />
                                            </div>
                                            <asp:UpdateProgress ID="UpdateProgress1" runat="server" AssociatedUpdatePanelID="UpdatePanel1">
                                                <ProgressTemplate>
                                                    <div>
                                                        <img height="59px" width="59px" alt="Please wait..." src="../../img/loader.gif" />
                                                    </div>
                                                </ProgressTemplate>
                                            </asp:UpdateProgress>
                                        </div>
                                    </div>
                                </asp:PlaceHolder>

                                <asp:PlaceHolder ID="DownloadPlaceHolder" runat="server" Visible="false">
                                    <div class="filesendemail">

                                        <div class="filesuccess">
                                            <label class="dz-message needsclick"><%=Resources["FileSignedSuccessMessage1"]%></label>
                                            <span class="downloadbtn convertbtn">
                                                <asp:Literal ID="litDownloadNow" runat="server"></asp:Literal>
                                            </span>
                                            <div class="clearfix">&nbsp;</div>
                                            <a href="/" class="btn btn-link refresh-c"><%=Resources["SignAnotherFile"]%> <i class="fa-refresh fa "></i></a>
                                            <a class="btn btn-link" target="_blank" href="https://products.groupdocs.cloud/signature/family">Cloud API &nbsp;<i class="fa-cloud fa"></i></a>
                                        </div>

                                        <p><%=Resources["SendTo"]%> </p>
                                        <div class="col-5 sendemail">
                                            <div class="input-group input-group-lg">
                                                <input type="email" id="emailTo" name="emailTo" class="form-control" placeholder="email@domain.com" runat="server" />
                                                <input type="hidden" id="downloadUrl" name="downloadUrl" runat="server" />
                                                <span class="input-group-btn">
                                                    <asp:LinkButton class="btn btn-success" type="button" ID="btnSend" runat="server" OnClick="btnSend_Click" Text="<i class='fa fa-envelope-o fa'></i>" />
                                                </span>
                                            </div>
                                        </div>
                                        <br />
                                        <asp:UpdateProgress ID="UpdateProgress2" runat="server" AssociatedUpdatePanelID="UpdatePanel1">
                                            <ProgressTemplate>
                                                <div>
                                                    <img height="59px" width="59px" alt="Please wait..." src="../../img/loader.gif" />
                                                </div>
                                            </ProgressTemplate>
                                        </asp:UpdateProgress>
                                        <p runat="server" id="pMessage2"></p>
                                    </div>
                                </asp:PlaceHolder>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 pt-5 bg-gray tc" id="dvAllFormats" runat="server">
                <div class="container">
                    <div class="col-md-12 pull-left">
                        <h2 class="h2title">GroupDocs.Signature App</h2>
                        <p>GroupDocs.Signature App Supported Document Formats</p>
                        <div class="diagram1 d2 d1-net">
                            <div class="d1-row">
                                <div class="d1-col d1-left">
                                    <header>Microsoft Office Formats</header>
                                    <ul>
                                        <li><strong>Word:</strong> DOC, DOCX, DOT, DOTX, DOCM, DOTM‎</li>
                                        <li><strong>Excel:</strong> XLS, XLSX, XLSM, XLSB, OTS, XLTX, XLTM</li>
                                        <li><strong>PowerPoint:</strong> PPT, PPTX, PPS, PPSX, OTP, POTX, POTM, PPTM, PPSM</li>
                                    </ul>
                                </div>
                                <!--/left-->


                                <div class="d1-col d1-right">
                                    <header>Other Formats</header>
                                    <ul>
                                        <li><strong>Portable:</strong> PDF</li>
                                        <li><strong>Text:</strong> TXT</li>
                                        <li><strong>Images:</strong> JPG, JPEG, WEBP, TIFF</li>
                                    </ul>
                                </div>
                                <!--/right-->
                            </div>
                            <!--/row-->
                            <div class="d1-logo">
                                <img src="https://www.groupdocs.cloud/templates/groupdocs/images/product-logos/90x90-noborder/groupdocs-signature-net.png" alt=".NET Files Signature API"><header>GroupDocs.Signature</header>
                                <footer><small>App</small></footer>
                            </div>
                            <!--/logo-->
                        </div>
                    </div>
                </div>
            </div>

<div class="col-md-12 pull-left d-flex d-wrap bg-gray appfeaturesectionlist" id="dvFormatSection" runat="server" visible="false">
		<div class="col-md-6 cardbox tc col-md-offset-3 b6">
			<h3 runat="server" id="hExtension1"></h3>
			<p runat="server" id="hExtension1Description"></p>
		</div>
</div>

            <div class="col-md-12 tl bg-darkgray howtolist">
                <div class="container tl dflex">
                    <div class="col-md-4 howtosectiongfx">
                        <img src="../../css/howto.png" />
                    </div>
                    <div class="howtosection col-md-8">
                        <div>
                            <h4><i class="fa fa-question-circle "></i><b>How to sign a <%=fileFormat  %>document using GroupDocs.Signature App</b></h4>
                            <ul>
                                <li>For signing your <%=fileFormat  %>document first select sign type (digital, text, barcode, image, stamp, qr code).</li>
                                <li>Enter signature value or select image signature if sign type is Image or Digital.</li>
                                <li>Select your <%=fileFormat  %>document for signing.</li>
                                <li>Select signature location and size and click <b>Sign Now</b> button.</li>
                                <li>Once your <%=fileFormat  %>document is signed click on <b>Download Now</b> button.</li>
                                <li>You may also send the download link to any email address by clicking on <b>Email</b> button.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-12 pt-5 app-features-section">
                <div class="container tc pt-5">
                    <div class="col-md-4">
                        <div class="imgcircle fasteasy">
                            <img src="../../img/fast-easy.png" />
                        </div>
                        <h4><%= Resources["SignatureFeature1"] %></h4>
                        <p><%= Resources["SignatureFeature1Description"] %></p>
                    </div>

                    <div class="col-md-4">
                        <div class="imgcircle anywhere">
                            <img src="../../img/anywhere.png" />
                        </div>
                        <h4><%= Resources["SignatureFeature2"] %></h4>
                        <p><%= Resources["Feature2Description"] %></p>
                    </div>

                    <div class="col-md-4">
                        <div class="imgcircle quality">
                            <img src="../../img/quality.png" />
                        </div>
                        <h4><%= Resources["SignatureFeature3"] %></h4>
                        <p><%= Resources["PoweredBy"] %> <a runat="server" target="_blank" id="aPoweredBy"></a><%= Resources["QualityDescMetadata"] %></p>
                    </div>
                </div>
            </div>

            <script type="text/javascript">
                window.onsubmit = function () {
                    if (Page_IsValid) {

                        var updateProgress = $find("<%= UpdateProgress1.ClientID %>");
                        if (updateProgress) {
                            window.setTimeout(function () {
                                updateProgress.set_visible(true);
                                document.getElementById('<%= pMessage.ClientID %>').style.display = 'none';
                            }, 100);
                        }

                        var updateProgress2 = $find("<%= UpdateProgress2.ClientID %>");
                        if (updateProgress2) {
                            window.setTimeout(function () {
                                updateProgress2.set_visible(true);
                                document.getElementById('<%= pMessage2.ClientID %>').style.display = 'none';
                            }, 100);
                        }
                    }
                }
            </script>
            <script>
                $(document).ready(function () {
                    bindEvents();
                });

                Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function (evt, args) {
                    bindEvents();
                });

                function bindEvents() {
                    $('.fileupload').hide();
                    $('#<%= UploadFile.ClientID %>').change(function () {
                        $('.fileupload').hide();
                        var file = document.getElementById('<%= UploadFile.ClientID %>').files[0].name;
                        $('#lblFilename').text(file);
                        $('.fileupload').show();
                        document.getElementById('<%= pMessage.ClientID %>').style.display = 'none';
                    });

                    $('.fileupload2').hide();
                    $('#<%= UploadFile2.ClientID %>').change(function () {
                        $('.fileupload2').hide();
                        var file = document.getElementById('<%= UploadFile2.ClientID %>').files[0].name;
                        $('#lblFilename2').text(file);
                        $('.fileupload2').show();
                        document.getElementById('<%= pMessage.ClientID %>').style.display = 'none';
                    });

                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                        var swiper = new Swiper('.swiper-container', {
                            slidesPerView: 5,
                            spaceBetween: 20,
                            // init: false,
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true,
                            },
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                            breakpoints: {
                                868: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                },
                                668: {
                                    slidesPerView: 2,
                                    spaceBetween: 0,
                                }
                            }
                        });
                    }
                }

                function OnDdlToChange()
                {
                    var ddlToValue = document.getElementById('<%= ddlTo.ClientID %>').value;
                    
                    document.getElementById('SignWithText').style.display = "none";
                    document.getElementById('SignWithImage').style.display = "none";

                    if (ddlToValue == "Image" || ddlToValue == "Digital")
                    {
                        document.getElementById('SignWithImage').style.display = "inline";
                    }

                    if (ddlToValue != "Image")
                    {
                        var holderTxt = " value"
                        if (ddlToValue == "Stamp") {
                            holderTxt = " text"
                        }

                        document.getElementById('<%= txtSignValue.ClientID %>').setAttribute("placeholder", "Enter " + ddlToValue + holderTxt);                       
                        document.getElementById('SignWithText').style.display = "inline";
                    }                   
                }

                OnDdlToChange();

            </script>
        </ContentTemplate>
        <Triggers>
            <asp:PostBackTrigger ControlID="btnSign" />
        </Triggers>
    </asp:UpdatePanel>
</asp:Content>
