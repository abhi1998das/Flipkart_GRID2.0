using DatabaseUpdate.Models;
using Newtonsoft.Json;
using RestSharp.Deserializers;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DatabaseUpdate.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ValuesController : ApiController
    {

        public string Post(string operation,string image,string key)
        {
            string ans = "";
            //7cfede14-8710-403f-8218-64eff90245a0
            if (operation=="Extract")
            {
                ans = Digital.Extract(key, image);
            }
            else if(operation=="Digital")
            {
                ans = Digital.getData(key, image);
//                ans = Digital.generateHTML(ans);
            }
            return ans;
        }
        // POST api/values
        public string Post(string data)
        {
            dynamic p =JsonConvert.DeserializeObject(data);
            DatabaseUpdate.SQLConnection conn = new SQLConnection();
            
            conn.Connect();
            string s = "Some error Occured";
            if (p.Operation == "Read")
                s = Newtonsoft.Json.JsonConvert.SerializeObject(conn.Read((string)p.table));
            else if (p.Operation == "CustomRead")
                s = Newtonsoft.Json.JsonConvert.SerializeObject(conn.CustomRead((string)p.table));
            else if (p.Operation == "CustomInsert")
            {
                
                conn.CustomInsert((string)p.table);
                s = "Success";
            }
            else if (p.Operation == "Insert")
            {
                conn.Insert(p.table, p.values);
                s = "Success";
            }
            else if (p.Operation == "Update")
            {
                conn.Update(p.table, p.values);
                s = "Success";
            }
            else if (p.Operation == "Delete")
            {
                conn.Delete(p.table, p.values[0]);
                s = "Success";
            }
            conn.endConnect();
            return s;
        }


        // POST api/values
        public string Post(Data p)
        {   
            DatabaseUpdate.SQLConnection conn = new SQLConnection();
            Data p1 = new Data();
            string s1 = JsonConvert.SerializeObject(p1),s2=JsonConvert.SerializeObject(p);
            Trace.TraceInformation(s1);
            conn.Connect();
            string s = "Some error Occured";
            if (p.Operation == "Read")
                s = Newtonsoft.Json.JsonConvert.SerializeObject(conn.Read((string)p.table));
            else if (p.Operation == "CustomRead")
                s = Newtonsoft.Json.JsonConvert.SerializeObject(conn.CustomRead((string)p.table));
            else if (p.Operation == "CustomInsert")
            {

                conn.CustomInsert((string)p.table);
                s = "Success";
            }
            else if (p.Operation == "Insert")
            {
                conn.Insert(p.table, p.values);
                s = "Success";
            }
            else if (p.Operation == "Update")
            {
                conn.Update(p.table, p.values);
                s = "Success";
            }
            else if (p.Operation == "Delete")
            {
                conn.Delete(p.table, p.values[0]);
                s = "Success";
            }
            conn.endConnect();
            return s;
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
