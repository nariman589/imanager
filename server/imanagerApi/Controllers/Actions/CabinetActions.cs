using Dapper;
using imanagerApi.HttpClients;
using imanagerApi.MyModels;
using imanagerApi.Services.SignatureService;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace imanagerApi.Controllers.Actions
{
    public class CabinetActions
    {
        private readonly Uri _cabinetConnectionString;
        private readonly HttpConnector _httpConnector;
        private readonly Uri _signerConnnectionString;
        private readonly Uri _signCabinetApi;
        private readonly Uri _portalApi;
        private readonly string _connectionString;
        public CabinetActions(string connectionString, Uri cabinetConnectionString, HttpConnector httpConnector, Uri signerConnnectionString, Uri signCabinetApi, Uri portalApi)
        {
            _connectionString = connectionString;
            _cabinetConnectionString = cabinetConnectionString;
            _httpConnector = httpConnector;
            _signerConnnectionString = signerConnnectionString;
            _signCabinetApi = signCabinetApi;
            _portalApi = portalApi;
        }
        //--global
        public async Task<CertInfo> GetCertInfo(Signature signature)
        {
            var request = JsonConvert.SerializeObject(new { cert = signature.File, pass = signature.Password });
            string response = await _httpConnector.PostAsyncWrap(request, new Uri(_signerConnnectionString, @"cert/info/pkcs"));
            return JsonConvert.DeserializeObject<CertInfo>(response);
        }

        public async Task<DocumentFiles> GetFiles(string docId)
        {
            var response = await _httpConnector.GetAsync(new Uri(_cabinetConnectionString, string.Format("docs/{0}/files", docId)));
            return JsonConvert.DeserializeObject<DocumentFiles>(response);
        }

        public async Task<string> FakeQR(string pdfDocument,string type, Signer signer)
        {
            byte[] bytes = Convert.FromBase64String(pdfDocument);
            SignatureService service = new SignatureService(_signerConnnectionString, _signCabinetApi, _httpConnector);
            CommonActions cActions = new CommonActions(_connectionString);
            if (type == "docx") {
                var pdfBytes = await cActions.ConvertToPDF(bytes);
                var Pdfrequest =  new {
                        fileData = pdfBytes,
                        signer
                    };
               
                return await service.FakeQR(JsonConvert.SerializeObject(Pdfrequest));
            }

            var request = new
            {
                fileData = bytes,
                signer
            };
            return await service.FakeQR(JsonConvert.SerializeObject(request));
        }

        public async Task<Events> GetEvents(string docId)
        {
            var response = await _httpConnector.GetAsync(new Uri(_cabinetConnectionString, string.Format("docs/{0}/events", docId)));
            return JsonConvert.DeserializeObject<Events>(response);
        }

        public async Task RejectDocument(string id, string execTabNum, string comment)
        {

            await _httpConnector.PostAsyncWrap(JsonConvert.SerializeObject(new
            {
                id,
                execTabNum,
                comment
            }), new Uri(_cabinetConnectionString, "docs/reject"));
        }



        public async Task RevokeDocument(string id, string execTabNum)
        {
            var data = new
            {
                id,
                execTabNum
            };

            await _httpConnector.PostAsyncWrap(JsonConvert.SerializeObject(data), new Uri(_cabinetConnectionString, "docs/revoke"));
        }

        public async Task<List<SapEvent>> GetSapEvents()
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<SapEvent>("SELECT ID, NAME FROM [JusanProcesses].[dbo].[CABINET_SAP_EVENTS] WHERE ARC_FL = 0", commandType: CommandType.Text)).ToList();
            }
        }

        public async Task<List<Attachment>> GetDocumentFiles(Guid documentId)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                var query = new StringBuilder().Append("SELECT LINK, NAME FROM[JusanProcesses].[dbo].[CABINET_DOC_FILES] WITH(NOLOCK) ");
                query.Append("WHERE DOC_ID = '" + documentId + "' ");
                query.Append("AND ARC_FL = 0 AND SIGN_FL = 0");

                return (await dbConnection.QueryAsync<Attachment>(query.ToString(), commandType: CommandType.Text)).ToList();
            }
        }

        //--EMPLOYEE

        public async Task<DocumentsList> GetAllEmployeeDocuments(string tabNumber)
        {
            var response = await _httpConnector.GetAsync(new Uri(_cabinetConnectionString, string.Format("docs/emp/{0}", tabNumber)));
            return JsonConvert.DeserializeObject<DocumentsList>(response);
        }

        public async Task SignDocumentEmployee(SignDocumentData data)
        {
            SignatureService service = new SignatureService(_signerConnnectionString, _signCabinetApi, _httpConnector);
            await service.SignEmp(JsonConvert.SerializeObject(MapSignRequest(data)));
        }

        private SignDocumentRequest MapSignRequest(SignDocumentData data)
        {
            return new SignDocumentRequest
            {
                doc = new DocID
                {
                    id = data.Document.id
                },
                signature = new CertData
                {
                    cert = data.Signature.File,
                    pass = data.Signature.Password
                },
                signer = data.signer
            };
        }

        //--HR
        public async Task<Pagination<Document>> GetAllHrDocuments(HRDocumentSearchParam data)
        {
            Uri uri;
            if (data.role == "HrHead") uri = new Uri(_cabinetConnectionString, "docs/head");
            else if (data.role == "HrChief") uri = new Uri(_cabinetConnectionString, "docs/chief");
            else uri = new Uri(_cabinetConnectionString, String.Format("docs/hr/{0}", data.employeeTabNumber));
            var response = await _httpConnector.PostAsyncWrap(JsonConvert.SerializeObject(data), uri); 
            return JsonConvert.DeserializeObject<Pagination<Document>>(response);
        }

        public async Task ConfirmDocument(string id, string execTabNum)
        {
            var data = new
            {
                id,
                execTabNum
            };
            await _httpConnector.PostAsyncWrap(JsonConvert.SerializeObject(data), new Uri(_cabinetConnectionString, "docs/confirm"));
        }

        public async Task ConfirmDocumentList(List<Document> documents, string execTabNum)
        {
            var data = new
            {
                documents,
                execTabNum
            };

            await _httpConnector.PostAsyncWrap(JsonConvert.SerializeObject(data), new Uri(_cabinetConnectionString, "docs/confirm/list"));
        }

        public async Task<SignHRResponse> SignDocumentHR(SignListDocumentData data)
        {
            var request = new SignDocumentsRequest()
            {
                docs = data.Documents.Select(x => new DocID() { id = x.id }).ToList(),
                signature = new CertData
                {
                    cert = data.Signature.File,
                    pass = data.Signature.Password
                },
                signer = data.signer
            };
            SignatureService service = new SignatureService(_signerConnnectionString, _signCabinetApi, _httpConnector);
            return await service.SignHR(JsonConvert.SerializeObject(request));
        }

      

        public async Task<List<Document>> GetHRExcelDocuments(HRDocumentSearchParam param, string tabNumber)
        {

            var response = await _httpConnector.PostAsyncWrap(JsonConvert.SerializeObject(param), new Uri(_cabinetConnectionString, string.Format("docs/export/hr/{0}", tabNumber)));
            return JsonConvert.DeserializeObject<List<Document>>(response);
        }

        public async Task<List<Document>> GetHRChiefExcelDocuments(HRDocumentSearchParam param)
        {
            var response = await _httpConnector.PostAsyncWrap(JsonConvert.SerializeObject(param), new Uri(_cabinetConnectionString, "docs/export/chief"));
            return JsonConvert.DeserializeObject<List<Document>>(response);
        }

        public async Task<List<Document>> GetHRHeadExcelDocuments(HRDocumentSearchParam param)
        {
            var response = await _httpConnector.PostAsyncWrap(JsonConvert.SerializeObject(param), new Uri(_cabinetConnectionString, "docs/export/head"));
            return JsonConvert.DeserializeObject<List<Document>>(response);
        }
        public async Task<string> CreateDocument(Document document)
        {
            return await _httpConnector.PutAsyncWrap(JsonConvert.SerializeObject(document), new Uri(_cabinetConnectionString, "docs"));
        }
        public async Task<string> PostToPortal(string file, string fileName, string candidateIin, string keyName)
        {

            byte[] bytes = Convert.FromBase64String(file);
            return await _httpConnector.PostFormDataAsyncWrap(bytes, fileName, new Uri(_portalApi, string.Format("prepare-contract/{0}", candidateIin)), keyName);
        }
        //--ACCOUNTANCE

        public async Task<Pagination<Document>> GetAccountanceDocument(HRDocumentSearchParam param, int tabNumber)
        {
            var response = await _httpConnector.PostAsyncWrap(JsonConvert.SerializeObject(param), new Uri(_cabinetConnectionString, $"docs/accounting/{tabNumber}"));
            return JsonConvert.DeserializeObject<Pagination<Document>>(response);
        }

        public async Task ConfirmDocumenAccounting(string id, string tabNumber)
        {
            var data = new
            {
                id,
                execTabNum = tabNumber
            };

            await _httpConnector.PostAsyncWrap(JsonConvert.SerializeObject(data), new Uri(_cabinetConnectionString, "docs/accounting/confirm"));
        }

        public async Task RejectDocumentAccounting(Reject data, int tabNumber)
        {
            var request = new
            {
                id = data.docId,
                execTabNum = tabNumber,
                data.comment
            };

            await _httpConnector.PostAsyncWrap(JsonConvert.SerializeObject(request), new Uri(_cabinetConnectionString, "docs/accounting/reject"));
        }

        public async Task<List<Document>> GetExcelDocumentsAccounting(HRDocumentSearchParam param, string tabNumber)
        {
            var response = await _httpConnector.PostAsyncWrap(JsonConvert.SerializeObject(param), new Uri(_cabinetConnectionString, $"docs/export/sheet/accounting/{tabNumber}"));
            return JsonConvert.DeserializeObject<List<Document>>(response);
        }

   
    }
}
