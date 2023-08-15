using imanagerApi.HttpClients;
using imanagerApi.Controllers.Actions;
using imanagerApi.Core;
using imanagerApi.MyModels;
using Microsoft.AspNetCore.Mvc;
using ClosedXML.Excel;

namespace imanagerApi.Controllers
{
    public class CabinetController : BaseApiController
    {
        private readonly Uri _cabinetConnectionString;
        private readonly HttpConnector _httpConnector;
        private readonly Uri _signerConnnectionString;
        private readonly Uri _signCabinetApi;
        private readonly Uri _portalApi;
        private CabinetActions _actions;
        private readonly string _connectionString;
        public CabinetController(IConfiguration configurations, HttpConnector httpConnector, IConfiguration connectionString)
        {
            _cabinetConnectionString = new Uri(configurations["DocumentApi:ConnectionString"]);
            _httpConnector = httpConnector;
            _signerConnnectionString = new Uri(configurations["SignerApi:ConnectionString"]);
            _signCabinetApi = new Uri(configurations["SignDocumentApi:ConnectionString"]);
            _portalApi = new Uri(configurations["PortalApi:ConnectionString"]);
            _connectionString = connectionString["Db:ConnectionString"];
            _actions = new CabinetActions(_connectionString, _cabinetConnectionString, _httpConnector, _signerConnnectionString, _signCabinetApi, _portalApi);
        }

        //---Global
        [HttpGet("SapEvents")]
        public async Task<ActionResult<Result<List<SapEvent>>>> SapEvents()
        {
            List<SapEvent> result = await _actions.GetSapEvents();
            return HandleResult(Result<List<SapEvent>>.Success(result));
        }

        [HttpGet("DocumentFiles")]
        public async Task<ActionResult<Result<List<Attachment>>>> DocumentFiles(Guid id)
        {
            List<Attachment> result = await _actions.GetDocumentFiles(id);
            return HandleResult(Result<List<Attachment>>.Success(result));
        }

        [HttpPost("CertInfo")]
        public async Task<ActionResult<Result<CertInfo>>> CertInfo([FromBody] Signature data)
        {
            CertInfo result = await _actions.GetCertInfo(data);
            return HandleResult(Result<CertInfo>.Success(result));
        }

        [HttpGet("Reject")]
        public async Task<ActionResult<Result<string>>> Reject(string id, string execTabNum, string comment)
        {
            await _actions.RejectDocument(id, execTabNum, comment);
            return HandleResult(Result<string>.Success("Успешно"));
        }

        [HttpGet("Revoke")]
        public async Task<ActionResult<Result<string>>> Revoke(string id, string execTabNum)
        {
            await _actions.RevokeDocument(id, execTabNum);
            return HandleResult(Result<string>.Success("Успешно"));
        }

        [HttpPost("FakeQR")]
        public async Task<ActionResult<Result<string>>> FakeQR([FromBody] FakeQr data)
        {
            string result = await _actions.FakeQR(data.pdfDocument,data.type, data.signer);
            return HandleResult(Result<string>.Success(result));
        }

        [HttpGet("Events")]
        public async Task<ActionResult<Result<Events>>> Events(string id)
        {
            Events result = await _actions.GetEvents(id);
            return HandleResult(Result<Events>.Success(result));
        }
        //---Employee
        [HttpGet("EmployeeAll")]
        public async Task<ActionResult<Result<DocumentsList>>> AllEmployeeDocuments(string tabNumber)
        {
            DocumentsList result = await _actions.GetAllEmployeeDocuments(tabNumber);
            return HandleResult(Result<DocumentsList>.Success(result));
        }

        [HttpPost("EmployeeSign")]
        public async Task<ActionResult<Result<string>>> SignEmployee([FromBody] SignDocumentData data)
        {
            await _actions.SignDocumentEmployee(data);
            return HandleResult(Result<string>.Success("Успешно"));
        }

        //---HR

        [HttpPost("HrAll")]
        public async Task<ActionResult<Result<Pagination<Document>>>> AllHrDocuments([FromBody] HRDocumentSearchParam data)
        {
            Pagination<Document> result = await _actions.GetAllHrDocuments(data);
            return HandleResult(Result<Pagination<Document>>.Success(result));
        }

        [HttpPost("HrConfirmDocument")]
        public async Task<ActionResult<Result<string>>> ConfirmDocumentHr([FromBody] Confirm data)
        {
            await _actions.ConfirmDocument(data.id, data.execTabNum);
            return HandleResult(Result<string>.Success("Успешно"));
        }

        [HttpPost("HrConfirmDocumenListt")]
        public async Task<ActionResult<Result<string>>> ConfirmDocumentListHr([FromBody] ConfirmList data)
        {
            await _actions.ConfirmDocumentList(data.documents, data.execTabNum);
            return HandleResult(Result<string>.Success("Успешно"));
        }

        [HttpPost("HrSign")]
        public async Task<ActionResult<Result<string>>> SignHr([FromBody] SignListDocumentData data)
        {
            await _actions.SignDocumentHR(data);
            return HandleResult(Result<string>.Success("Успешно"));
        }
        [HttpGet("HrExcel")]
        public async Task<ActionResult<Result<IActionResult>>> Excel(byte status, int tab, string tabNumber, string role, string? fromDate, string? toDate)
        {
            var searchParam = new HRDocumentSearchParam()
            {
                status = status,
                empTab = tab,
                fromDate = fromDate,
                toDate = toDate
            };
            List<Document> response = new List<Document>();
            if (role == "Hr")
            {
                response = await _actions.GetHRExcelDocuments(searchParam, tabNumber);
            }
            else if (role == "HrChief")
            {
                response = await _actions.GetHRChiefExcelDocuments(searchParam);
            }
            else if (role == "HrHead")
            {
                response = await _actions.GetHRHeadExcelDocuments(searchParam);
            }

            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Documents");

                var currentRow = 1;

                worksheet.Cell(currentRow, 1).Value = "Номер приказа";
                worksheet.Cell(currentRow, 2).Value = "Дата приказа";
                worksheet.Cell(currentRow, 3).Value = "ФИО сотрудника";
                worksheet.Cell(currentRow, 4).Value = "Филиал";
                worksheet.Cell(currentRow, 5).Value = "Подразделение";
                worksheet.Cell(currentRow, 6).Value = "Тип документа";
                worksheet.Cell(currentRow, 7).Value = "Исполнитель";
                worksheet.Cell(currentRow, 8).Value = "Статус";
                worksheet.Cell(currentRow, 9).Value = "Поступил работнику";
                worksheet.Cell(currentRow, 10).Value = "Время регистрации";

                foreach (var doc in response)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = doc.regNum;
                    worksheet.Cell(currentRow, 2).Value = doc.regDate;
                    worksheet.Cell(currentRow, 3).Value = doc.employeeFullName;
                    worksheet.Cell(currentRow, 4).Value = doc.employeeBranchName;
                    worksheet.Cell(currentRow, 5).Value = doc.employeeDepName;
                    worksheet.Cell(currentRow, 6).Value = doc.sapEventName;
                    worksheet.Cell(currentRow, 7).Value = doc.executorFullName;
                    worksheet.Cell(currentRow, 8).Value = doc.statusDesc;
                    worksheet.Cell(currentRow, 9).Value = doc.employeeGetDocTime;
                    worksheet.Cell(currentRow, 10).Value = doc.createTime;
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Документы ЛК.xlsx");
                }
            }
        }
        [HttpPost("CreateDocument")]
        public async Task<ActionResult<Result<string>>> CreateDocument([FromBody] Document document)
        {
            await _actions.CreateDocument(document);
            return HandleResult(Result<string>.Success("Успешно"));
        }

        [HttpPost("PostToPortal")]
        public async Task<ActionResult<Result<string>>> PostToPortal([FromBody] PostToPortal data)
        {
            await _actions.PostToPortal(data.file, data.fileName, data.candidateIin, data.keyName);
            return HandleResult(Result<string>.Success("Успешно"));
        }

        //---Accountance

        [HttpPost("AccountanceAll")]
        public async Task<ActionResult<Result<Pagination<Document>>>> AllAccountanceDocuments([FromBody] HRDocumentSearchParam param)
        {
            Pagination<Document> result = await _actions.GetAccountanceDocument(param, param.employeeTabNumber);
            return HandleResult(Result<Pagination<Document>>.Success(result));
        }

        [HttpPost("AccountanceConfirmDocument")]
        public async Task<ActionResult<Result<string>>> AccountanceConfirmDocument([FromBody] Confirm data)
        {
            await _actions.ConfirmDocumenAccounting(data.id, (data.execTabNum).ToString());
            return HandleResult(Result<string>.Success("Успешно"));
        }

        [HttpPost("AccountanceRejectDocument")]
        public async Task<ActionResult<Result<string>>> AccountanceRejectDocument([FromBody] Reject data)
        {
            await _actions.RejectDocumentAccounting(data, data.tabNumber);
            return HandleResult(Result<string>.Success("Успешно"));
        }

        [HttpGet("AccountanceExcel")]
        public async Task<ActionResult<Result<IActionResult>>> AccountanceExcel(byte status, int tab, string tabNumber, string? fromDate, string? toDate)
        {
            var searchParam = new HRDocumentSearchParam()
            {
                status = status,
                empTab = tab,
                fromDate = fromDate,
                toDate = toDate
            };
            var response = await _actions.GetExcelDocumentsAccounting(searchParam, tabNumber);


            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Documents");

                var currentRow = 1;

                worksheet.Cell(currentRow, 1).Value = "Номер приказа";
                worksheet.Cell(currentRow, 2).Value = "Дата приказа";
                worksheet.Cell(currentRow, 3).Value = "ФИО сотрудника";
                worksheet.Cell(currentRow, 4).Value = "Филиал";
                worksheet.Cell(currentRow, 5).Value = "Подразделение";
                worksheet.Cell(currentRow, 6).Value = "Тип документа";
                worksheet.Cell(currentRow, 7).Value = "Исполнитель";
                worksheet.Cell(currentRow, 8).Value = "Статус";
                worksheet.Cell(currentRow, 9).Value = "Поступил работнику";
                worksheet.Cell(currentRow, 10).Value = "Время регистрации";
                worksheet.Cell(currentRow, 11).Value = "Исполнитель ДУАХО";

                foreach (var doc in response)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = doc.regNum;
                    worksheet.Cell(currentRow, 2).Value = doc.regDate;
                    worksheet.Cell(currentRow, 3).Value = doc.employeeFullName;
                    worksheet.Cell(currentRow, 4).Value = doc.employeeBranchName;
                    worksheet.Cell(currentRow, 5).Value = doc.employeeDepName;
                    worksheet.Cell(currentRow, 6).Value = doc.sapEventName;
                    worksheet.Cell(currentRow, 7).Value = doc.executorFullName;
                    worksheet.Cell(currentRow, 8).Value = doc.statusDesc;
                    worksheet.Cell(currentRow, 9).Value = doc.employeeGetDocTime;
                    worksheet.Cell(currentRow, 10).Value = doc.createTime;
                    worksheet.Cell(currentRow, 11).Value = doc.accountingFullName;
                }

                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Документы ЛК УУЗП.xlsx");
                }
            }
        }

    }
}
