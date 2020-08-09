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
    public class BulkController : ApiController
    {
        public string Post(Inser a)
        {
            SQLConnection.BulkCopy(a.Link, a.Digital, a.Extract, a.Table);
            return "done";
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
