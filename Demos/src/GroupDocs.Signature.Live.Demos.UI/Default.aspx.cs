using System;
using GroupDocs.Signature.Live.Demos.UI.Config;
using System.Web;
using GroupDocs.Signature.Live.Demos.UI.Models;
using System.Web.UI.WebControls;
using System.Text.RegularExpressions;
using GroupDocs.Signature.Live.Demos.UI.Helpers;

namespace GroupDocs.Signature.Live.Demos.UI
{
	public partial class Default : BasePage
	{
        public string fileFormat = "";
        string logMsg = "";

        private string GetValidFileExtensions(string validationExpression)
        {
            string validFileExtensions = validationExpression.Replace(".", "").Replace("|", ", ").ToUpper();

            int index = validFileExtensions.LastIndexOf(",");
            if (index != -1)
            {
                string substr = validFileExtensions.Substring(index);
                string str = substr.Replace(",", " or");
                validFileExtensions = validFileExtensions.Replace(substr, str);
            }

            return validFileExtensions;
        }

        protected void Page_Load(object sender, EventArgs e)
		{            
            if (!IsPostBack)
			{
                dvAllFormats.Visible = true;

                aPoweredBy.InnerText = "GroupDocs.Signature. "; ;
				aPoweredBy.HRef = "https://products.groupdocs.com/signature";

                string validationExpression = Resources["SignatureValidationExpression"];
                if (Page.RouteData.Values["fileformat"] != null)
                {
                    validationExpression = "." + Page.RouteData.Values["fileformat"].ToString().ToLower();
                }
                string validFileExtensions = GetValidFileExtensions(validationExpression);
                ValidateFileType.ValidationExpression = @"(.*?)(" + validationExpression.ToLower() + "|" + validationExpression.ToUpper() + ")$";                
                ValidateFileType.ErrorMessage = Resources["InvalidFileExtension"] + " " + validFileExtensions;

                string validationExpression2 = Resources["ocrValidationExpression"];
                string validFileExtensions2 = GetValidFileExtensions(validationExpression2);
                ValidateFileType2.ValidationExpression = @"(.*?)(" + validationExpression2.ToLower() + "|" + validationExpression2.ToUpper() + ")$";
                ValidateFileType2.ErrorMessage = Resources["InvalidFileExtension"] + " " + validFileExtensions2;

                ddlTo.Items.Clear();
                string[] lstFormats = new string[] { "Digital", "Barcode", "Image", "QR-code", "Stamp", "Text" };
                foreach (string str in lstFormats)
                {
                    ddlTo.Items.Add(new ListItem(str, str));
                }

                ddlLocation.Items.Clear();
                string[] lstLocations = new string[] { "Top Right", "Top Left", "Bottom Right", "Bottom Left" };
                foreach (string str in lstLocations)
                {
                    ddlLocation.Items.Add(new ListItem(str, str));
                }

                ddlSize.Items.Clear();
                string[] lstSizes = new string[] { "Small", "Medium", "Large" };
                foreach (string str in lstSizes)
                {
                    ddlSize.Items.Add(new ListItem(str, str));
                }
                ddlSize.SelectedValue = "Medium";

                Page.Title = "Free online document signature for DOC, DOCX, PDF, XLSX, PPTX and other formats";
                Page.MetaDescription = "Sign documents in many formats, DOC, DOCX, PDF, XLSX, PPTX and other formats";
            }
		}

		protected void btnSign_Click(object sender, EventArgs e)
		{
            Configuration.GroupDocsAppsAPIBasePath = Request.Url.Scheme + "://" + Request.Url.Authority + Request.ApplicationPath.TrimEnd('/') + "/";
            Configuration.FileDownloadLink = Configuration.GroupDocsAppsAPIBasePath + "DownloadFile.aspx";

            if (IsValid)
            {
                bool errFlag = true;                                

                if (ddlTo.SelectedItem.Text != "Image" && txtSignValue.Value.Trim().Length == 0)
                {
                    pMessage.InnerHtml = txtSignValue.Attributes["placeholder"].ToString();
                }
                else if ((ddlTo.SelectedItem.Text == "Image" || ddlTo.SelectedItem.Text == "Digital") && ((UploadFile2.PostedFile == null) || (UploadFile2.PostedFile.ContentLength == 0)))
                {
                    pMessage.InnerHtml = "Please select Image signature file";
                }
                else if ((UploadFile.PostedFile == null) || (UploadFile.PostedFile.ContentLength == 0))
                {
                    pMessage.InnerHtml = Resources["FileSelectMessage"];
                }
                else
                {
                    errFlag = false;
                }                                

                if (!errFlag)
                {                    
                    try
                    {
                        string signImage = "";
                        string fn = Regex.Replace(System.IO.Path.GetFileName(UploadFile.PostedFile.FileName).Trim(), @"\A(?!(?:COM[0-9]|CON|LPT[0-9]|NUL|PRN|AUX|com[0-9]|con|lpt[0-9]|nul|prn|aux)|[\s\.])[^\\\/:*"" ?<>|]{ 1,254}\z", "");
                        string SaveLocation = Configuration.AssetPath + fn;
                        UploadFile.PostedFile.SaveAs(SaveLocation);                        
                        var isFileUploaded = FileManager.UploadFile(SaveLocation, "");

                        if ((isFileUploaded != null) && (isFileUploaded.FileName.Trim() != ""))
                        {

                            if ((ddlTo.SelectedItem.Text == "Image" || ddlTo.SelectedItem.Text == "Digital") && UploadFile2.PostedFile != null && UploadFile2.PostedFile.ContentLength > 0)
                            {                                
                                string fn2 = System.IO.Path.GetFileName(UploadFile2.PostedFile.FileName);
                                string SaveLocation2 = Configuration.AssetPath + fn2;
                                UploadFile2.PostedFile.SaveAs(SaveLocation2);
                                var isFileUploaded2 = FileManager.UploadFile(SaveLocation2, "");
                                if ((isFileUploaded2 != null) && (isFileUploaded2.FileName.Trim() != ""))
                                {
                                    signImage = isFileUploaded2.LocalFilePath;
                                }
                            }

                            Response response = GroupDocsSignatureApiHelper.SignFile(isFileUploaded.FileName, isFileUploaded.FolderId, ddlTo.SelectedItem.Text.ToLower(), txtSignValue.Value.Trim(), signImage, ddlLocation.SelectedItem.Text.ToLower(), ddlSize.SelectedItem.Text.ToLower());

                            if (response == null)
                            {
                                throw new Exception(Resources["APIResponseTime"]);
                            }
                            else if (response.StatusCode == 200)
                            {
                                string url = Configuration.FileDownloadLink + "?FileName=" + response.FileName + "&Time=" + DateTime.Now.ToString();
                                litDownloadNow.Text = "<a target=\"_blank\" href=\"" + url + "\" class=\"btn btn-success btn-lg\">" + Resources["DownLoadNow"] + " <i class=\"fa fa-download\"></i></a>";
                                downloadUrl.Value = HttpUtility.UrlEncode(url);

                                ConvertPlaceHolder.Visible = false;
                                DownloadPlaceHolder.Visible = true;

                                logMsg = "ControllerName: GroupDocsSignatureController FileName: " + response.FileName + " FolderName: " + isFileUploaded.FolderId + " OutFileExtension: " + "txt";
                            }
                            else
                            {
                                string msg = response.Status;

                                if (msg.ToLower().Contains("password"))
                                {
                                    string asposeProduct = GetAsposeUnlockProduct(isFileUploaded.FileName);
                                    if (asposeProduct != null)
                                    {
                                        string asposeUrl = Configuration.ProductsGroupDocsAppsURL.ToLower().Replace("groupdocs", "aspose") + "/" + asposeProduct.ToLower() + "/unlock";
                                        msg = "Your file seems to be encrypted. Please use our <a href=\"" + asposeUrl + "\">\"Unlock " + asposeProduct + "\"</a> app to remove the password.";
                                    }
                                }

                                throw new Exception(msg);
                            }

                        }
                    }
                    catch (Exception ex)
                    {
                        pMessage.InnerHtml = "Error: " + ex.Message;
                        pMessage.Attributes.Add("class", "alert alert-danger");
                    }
                } 
                else
                {
                    pMessage.Attributes.Add("class", "alert alert-danger");
                }
			}
		}

		protected void btnSend_Click(object sender, EventArgs e)
		{
			try
			{
                if (emailTo.Value.Trim() == "")
                {
                    pMessage2.InnerHtml = Resources["MissingEmailMsg"];
                    pMessage2.Attributes.Add("class", "alert alert-danger");
                }
                else
                {
                    string url = HttpUtility.UrlDecode(downloadUrl.Value);
                    string emailBody = EmailManager.PopulateEmailBody(Resources["SignatureEmailHeading"], url, Resources["FileSignedSuccessMessage1"]);
                    EmailManager.SendEmail(emailTo.Value, Configuration.FromEmailAddress, Resources["SignatureEmailTitle"], emailBody, "");

                    pMessage2.Attributes.Add("class", "alert alert-success");
                    pMessage2.InnerHtml = Resources["FileSignatureSuccessMessage"];
                }
			}
			catch (Exception ex)
			{
				pMessage2.InnerHtml = "Error: " + ex.Message;
				pMessage2.Attributes.Add("class", "alert alert-danger");
			}
		}
    }
}