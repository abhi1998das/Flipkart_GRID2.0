
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatabaseUpdate.Models
{
    public class Data
    {
        public string Operation { get; set; }
        public string table { get; set; }
        public List<KeyValuePair<string, string>> values { get; set; }
    }
}