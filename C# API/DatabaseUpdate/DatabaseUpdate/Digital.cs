using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Pipes;
using Cloudmersive.APIClient.NET.OCR.Api;
using Cloudmersive.APIClient.NET.OCR.Client;
using Cloudmersive.APIClient.NET.OCR.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DatabaseUpdate
{
    public class Digital
    {
        
        public static string Extract(string key, string image)
        {
            string ans = "";
            Configuration.Default.AddApiKey("Apikey", key);//"7cfede14-8710-403f-8218-64eff90245a0"

            var apiInstance = new ImageOcrApi();
            //"C:\previous Computer\home\Sample Invoices\In_2\invoice.png"
            System.Net.WebClient wb = new System.Net.WebClient();
            var imageFile = wb.OpenRead(@image); // System.IO.Stream | Image file to perform OCR on.  Common file formats such as PNG, JPEG are supported.
            var recognitionMode = "Normal";  // string | Optional; possible values are 'Normal' which provides highly fault tolerant OCR recognition uses 14-16 API calls; and 'Advanced' which provides the highest quality and most fault-tolerant recognition uses 28-30 API calls.  Default recognition mode is 'Advanced' (optional) 
            var language = "ENG";  // string | Optional, language of the input document, default is English (ENG).  Possible values are ENG (English), ARA (Arabic), ZHO (Chinese - Simplified), ZHO-HANT (Chinese - Traditional), ASM (Assamese), AFR (Afrikaans), AMH (Amharic), AZE (Azerbaijani), AZE-CYRL (Azerbaijani - Cyrillic), BEL (Belarusian), BEN (Bengali), BOD (Tibetan), BOS (Bosnian), BUL (Bulgarian), CAT (Catalan; Valencian), CEB (Cebuano), CES (Czech), CHR (Cherokee), CYM (Welsh), DAN (Danish), DEU (German), DZO (Dzongkha), ELL (Greek), ENM (Archaic/Middle English), EPO (Esperanto), EST (Estonian), EUS (Basque), FAS (Persian), FIN (Finnish), FRA (French), FRK (Frankish), FRM (Middle-French), GLE (Irish), GLG (Galician), GRC (Ancient Greek), HAT (Hatian), HEB (Hebrew), HIN (Hindi), HRV (Croatian), HUN (Hungarian), IKU (Inuktitut), IND (Indonesian), ISL (Icelandic), ITA (Italian), ITA-OLD (Old - Italian), JAV (Javanese), JPN (Japanese), KAN (Kannada), KAT (Georgian), KAT-OLD (Old-Georgian), KAZ (Kazakh), KHM (Central Khmer), KIR (Kirghiz), KOR (Korean), KUR (Kurdish), LAO (Lao), LAT (Latin), LAV (Latvian), LIT (Lithuanian), MAL (Malayalam), MAR (Marathi), MKD (Macedonian), MLT (Maltese), MSA (Malay), MYA (Burmese), NEP (Nepali), NLD (Dutch), NOR (Norwegian), ORI (Oriya), PAN (Panjabi), POL (Polish), POR (Portuguese), PUS (Pushto), RON (Romanian), RUS (Russian), SAN (Sanskrit), SIN (Sinhala), SLK (Slovak), SLV (Slovenian), SPA (Spanish), SPA-OLD (Old Spanish), SQI (Albanian), SRP (Serbian), SRP-LAT (Latin Serbian), SWA (Swahili), SWE (Swedish), SYR (Syriac), TAM (Tamil), TEL (Telugu), TGK (Tajik), TGL (Tagalog), THA (Thai), TIR (Tigrinya), TUR (Turkish), UIG (Uighur), UKR (Ukrainian), URD (Urdu), UZB (Uzbek), UZB-CYR (Cyrillic Uzbek), VIE (Vietnamese), YID (Yiddish) (optional) 
            var preprocessing = "Auto";  // string | Optional, preprocessing mode, default is 'Auto'.  Possible values are None (no preprocessing of the image), and Auto (automatic image enhancement of the image before OCR is applied; this is recommended). (optional) 

            try
            {
                // Recognize a photo of a receipt, extract key business information
                ReceiptRecognitionResult result = apiInstance.ImageOcrPhotoRecognizeReceipt(imageFile, recognitionMode, language, preprocessing);
                Debug.WriteLine(result);
                ans = JsonConvert.SerializeObject(result);

            }
            catch (Exception e)
            {
                Debug.Print("Exception when calling ImageOcrApi.ImageOcrPhotoRecognizeReceipt: " + e.Message);
            }
            return ans;
        }


        public static void writeFiles(string files, string data)
        {
            string file = @files;

            File.WriteAllText(file, data);
        }

        public static string readFile(string files)
        {
            string file = @files, ans = "";
            if (File.Exists(file))
            {
                string str = File.ReadAllText(file);
                ans += str + "\n";
            }
            return ans;
        }

        public static string generateHTML(string data)
        {
            string ans = "";
            Console.WriteLine(data);
            dynamic parse = JsonConvert.DeserializeObject(data);
            Dictionary<int, int> xdict = new Dictionary<int, int>(), ydict = new Dictionary<int, int>();
            foreach (var words in parse)
            {
                int x = words["XLeft"], mx = x, c = 6;
                for (int i = x - c; i <= x + c; i++)
                    if (xdict.ContainsKey(i) && xdict[i] < (xdict.ContainsKey(mx) ? xdict[mx] : 1))
                        mx = i;


                int y = words["YTop"];
                int my = y;
                for (int i = y - c; i <= y + c; i++)
                    if (ydict.ContainsKey(i) && ydict[i] < (ydict.ContainsKey(my) ? ydict[my] : 1))
                        my = i;

                //words["XLeft"] = mx;
                //words["YTop"] = my;
                ans += "<p style=\"position: absolute; font-size:12px;  top: " + words["YTop"] + "px;  left: " + words["XLeft"] + "px;\">" + words["Text"] + "</p>";
                ans += "\n";


                if (!ydict.ContainsKey(my))
                    ydict.Add(my, 1);
                else
                    ydict[my]++;

                if (!xdict.ContainsKey(mx))
                    xdict.Add(mx, 1);
                else
                    xdict[mx]++;
            }
            return ans;
        }

        public static string getData(string key, string image)
        {
            // Configure API key authorization: Apikey
            Configuration.Default.AddApiKey("Apikey", key);//"7cfede14-8710-403f-8218-64eff90245a0"
            // Uncomment below to setup prefix (e.g. Bearer) for API key, if needed
            // Configuration.Default.AddApiKeyPrefix("Apikey", "Bearer");

            var apiInstance = new ImageOcrApi();
            //"C:\previous Computer\home\Sample Invoices\In_2\invoice.png"
            System.Net.WebClient wb = new System.Net.WebClient();
            var imageFile = wb.OpenRead(@image); // System.IO.Stream | Image file to perform OCR on.  Common file formats such as PNG, JPEG are supported.
            var recognitionMode = "Normal";  // string | Optional; possible values are 'Normal' which provides highly fault tolerant OCR recognition uses 14-16 API calls; and 'Advanced' which provides the highest quality and most fault-tolerant recognition uses 28-30 API calls.  Default recognition mode is 'Advanced' (optional) 
            var language = "ENG";  // string | Optional, language of the input document, default is English (ENG).  Possible values are ENG (English), ARA (Arabic), ZHO (Chinese - Simplified), ZHO-HANT (Chinese - Traditional), ASM (Assamese), AFR (Afrikaans), AMH (Amharic), AZE (Azerbaijani), AZE-CYRL (Azerbaijani - Cyrillic), BEL (Belarusian), BEN (Bengali), BOD (Tibetan), BOS (Bosnian), BUL (Bulgarian), CAT (Catalan; Valencian), CEB (Cebuano), CES (Czech), CHR (Cherokee), CYM (Welsh), DAN (Danish), DEU (German), DZO (Dzongkha), ELL (Greek), ENM (Archaic/Middle English), EPO (Esperanto), EST (Estonian), EUS (Basque), FAS (Persian), FIN (Finnish), FRA (French), FRK (Frankish), FRM (Middle-French), GLE (Irish), GLG (Galician), GRC (Ancient Greek), HAT (Hatian), HEB (Hebrew), HIN (Hindi), HRV (Croatian), HUN (Hungarian), IKU (Inuktitut), IND (Indonesian), ISL (Icelandic), ITA (Italian), ITA-OLD (Old - Italian), JAV (Javanese), JPN (Japanese), KAN (Kannada), KAT (Georgian), KAT-OLD (Old-Georgian), KAZ (Kazakh), KHM (Central Khmer), KIR (Kirghiz), KOR (Korean), KUR (Kurdish), LAO (Lao), LAT (Latin), LAV (Latvian), LIT (Lithuanian), MAL (Malayalam), MAR (Marathi), MKD (Macedonian), MLT (Maltese), MSA (Malay), MYA (Burmese), NEP (Nepali), NLD (Dutch), NOR (Norwegian), ORI (Oriya), PAN (Panjabi), POL (Polish), POR (Portuguese), PUS (Pushto), RON (Romanian), RUS (Russian), SAN (Sanskrit), SIN (Sinhala), SLK (Slovak), SLV (Slovenian), SPA (Spanish), SPA-OLD (Old Spanish), SQI (Albanian), SRP (Serbian), SRP-LAT (Latin Serbian), SWA (Swahili), SWE (Swedish), SYR (Syriac), TAM (Tamil), TEL (Telugu), TGK (Tajik), TGL (Tagalog), THA (Thai), TIR (Tigrinya), TUR (Turkish), UIG (Uighur), UKR (Ukrainian), URD (Urdu), UZB (Uzbek), UZB-CYR (Cyrillic Uzbek), VIE (Vietnamese), YID (Yiddish) (optional) 
            var preprocessing = "Auto";  // string | Optional, preprocessing mode, default is 'Auto'.  Possible values are None (no preprocessing of the image), and Auto (automatic image enhancement of the image before OCR is applied; this is recommended). (optional) 
            var diagnostics = "false";  // string | Optional, diagnostics mode, default is 'false'.  Possible values are 'true' (will set DiagnosticImage to a diagnostic PNG image in the result), and 'false' (no diagnostics are enabled; this is recommended for best performance). (optional) 

            string ans = "";
            try
            {

                // Convert a photo of a document or receipt into words with location
                PhotoToWordsWithLocationResult result = apiInstance.ImageOcrPhotoWordsWithLocation(imageFile, recognitionMode, language, preprocessing, diagnostics);
                ans = JsonConvert.SerializeObject(result.TextElements);

            }
            catch (Exception e)
            {
                Debug.Print("Exception when calling ImageOcrApi.ImageOcrPhotoWordsWithLocation: " + e.Message);
            }
            return ans;
        }
    }
}