using Dapper;
using imanagerApi.MyModels;
using System.Data;
using System.Data.SqlClient;

namespace imanagerApi.Controllers.Actions
{
    public class HrReportActions
    {
        private readonly string _connectionString;

        public HrReportActions(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<EmployeeArchive>> GetHRReport(string branchCode, string blockCode, string depCode, string initiatorFullName,
                                                        string regNumber, string emplFullName, DateTime startDate, DateTime endDate)
        {

            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<EmployeeArchive>("[LAMS].[Site].[GetReport_HRProcesses]", param: new { in_branchCode = branchCode, in_blockCode = blockCode , in_depCode = depCode , in_initiatorFullName = initiatorFullName, in_regNumber = regNumber, in_emplFullName = emplFullName, in_startDate = startDate, in_endDate = endDate }, commandType: CommandType.StoredProcedure)).ToList();
            }

        }

    }
}
