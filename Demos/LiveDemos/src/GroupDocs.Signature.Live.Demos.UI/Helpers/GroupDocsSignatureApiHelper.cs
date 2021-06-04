using GroupDocs.Signature.Live.Demos.UI.Models;
using GroupDocs.Signature.Live.Demos.UI.Config;
using System.Net.Http;
using System.Net.Http.Headers;

namespace GroupDocs.Signature.Live.Demos.UI.Helpers
{
	public class GroupDocsSignatureApiHelper
	{
		public static Response SignFile(string fileName, string folderName, string signType, string signText, string signImagePath, string location, string size)
        {
			Response convertResponse = null;

			using (var client = new HttpClient())
			{
				client.DefaultRequestHeaders.Clear();
				client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
				System.Threading.Tasks.Task taskUpload = client.GetAsync(Configuration.GroupDocsAppsAPIBasePath + "api/GroupDocsSignature/SignFile?fileName=" + fileName 
                    + "&folderName=" + folderName + "&signType=" + signType + "&signText=" + signText + "&signImagePath=" + signImagePath + "&signLocation=" + location + "&signSize=" + size).ContinueWith(task =>
				{
					if (task.Status == System.Threading.Tasks.TaskStatus.RanToCompletion)
					{
						HttpResponseMessage response = task.Result;
						if (response.IsSuccessStatusCode)
						{
							convertResponse = response.Content.ReadAsAsync<Response>().Result;
						}
					}
				});
				taskUpload.Wait();
			}

			return convertResponse;
		}
		
	}
}