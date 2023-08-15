using imanagerApi.Controllers.Actions;
using imanagerApi.Core;
using imanagerApi.MyModels;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace imanagerApi.Controllers
{
    public class ReportsController : BaseApiController
    {
        private readonly string _connectionString;
        public ReportsController(IConfiguration configuration)
        {
            _connectionString = configuration["Db:ConnectionString"];
        }

        [HttpGet("HrReports")]
        public async Task<ActionResult<Result<List<EmployeeArchive>>>> GetReport(string branchCode, string? blockCode, string? depCode, string? initiatorFullName,
                                                        string? regNumber, string? emplFullName, DateTime startDate, DateTime endDate)
        {
            try
            {
                HrReportActions hrReport = new HrReportActions(_connectionString);
                List<EmployeeArchive> reportList = await hrReport.GetHRReport(branchCode, blockCode ?? "", depCode ?? "", initiatorFullName ?? "",
                                                          regNumber ?? "", emplFullName ?? "", startDate, endDate);
                return HandleResult(Result<List<EmployeeArchive>>.Success(reportList));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }
    }
}
