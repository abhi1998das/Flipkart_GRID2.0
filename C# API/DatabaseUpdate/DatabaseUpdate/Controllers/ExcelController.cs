using DatabaseUpdate.Models;
using System;

using System.Web.Mvc;

using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.IO;
using System.Net;
using System.Collections.Generic;

namespace DatabaseUpdate.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ExcelController : ApiController
    {
        public HttpResponseMessage Post(List<List<string>> data)
        {
            MemoryStream stream = new MemoryStream();
            StreamWriter writer = new StreamWriter(stream);
            for (int i = 0; i < data.Count; i++)
            {
                for (int j = 0; j < data[i].Count; j++)
                {
                    writer.Write(data[i][j]);
                    if (j == data[i].Count - 1)
                        writer.Write("\n");
                    else
                        writer.Write(",");
                }
            }
            writer.Flush();
            stream.Position = 0;

            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            result.Content = new StreamContent(stream);
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("text/csv");
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment") { FileName = "Export.csv" };
            return result;
        }
        // PUT api/values/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }

    }
}
