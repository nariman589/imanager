using Dapper;
using imanagerApi.MyModels;
using System.Data;
using System.Data.SqlClient;

namespace imanagerApi.Controllers.Actions
{
    public class SubstituteActions
    {
        private readonly string _connectionString;

        public SubstituteActions(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<Substitute>> GetSubstituteList(string userLogin)
        {
            using (var dBConnection = new SqlConnection(_connectionString))
            {
                var assistantList = (await dBConnection.QueryAsync<Substitute>("[LAMS].[Site].[W_GET_ASSISTANT_LIST_NEW_JUSAN]",new { UserCode_ = userLogin }, commandType: CommandType.StoredProcedure)).ToList();
                return assistantList;
            }
        }
        public async Task AddSubstitute(AddSubstitute user)
        {
            using (var dBConnection = new SqlConnection(_connectionString))
            {
                await dBConnection.QueryAsync<Substitute>("[LAMS].[Site].[W_INSERT_ASSISTANT]", new { UserCode = "TSB\\" + user.UserCode , Assistant_code = user.Assistant_code, Assistant_name = user.Assistant_name , END_DATETIME = user.END_DATETIME }, commandType: CommandType.StoredProcedure);
              
            }
        }
        public async Task DeleteSubstitute(DeleteSubstitute user)
        {
            using (var dBConnection = new SqlConnection(_connectionString))
            {
                await dBConnection.QueryAsync<Substitute>("[LAMS].[Site].[W_DELETE_ASSISTANT]", new { UserCode = "TSB\\" + user.UserCode, Assistant_code = user.Assistant_code }, commandType: CommandType.StoredProcedure);

            }
        }


        public async Task<List<EmployeeSubstitute>> GetSubstituteEmployee(string term)
        {
            using (var dBConnection = new SqlConnection(_connectionString))
            { 
              var employeeList =  (await dBConnection.QueryAsync<EmployeeSubstitute>("[LAMS].[Site].[Get_AddressBookNew]", new { FIO = term }, commandType: CommandType.StoredProcedure)).ToList();
            return employeeList;
            }
        }

        public async Task<List<EmployeeSubstitute>> GetSubstituteEmployeeByTubNumber(int? tabNumber)
        {
            using (var dBConnection = new SqlConnection(_connectionString))
            {
                var employeeList = (await dBConnection.QueryAsync<EmployeeSubstitute>("[LocalCache].[dbo].[GetJusanBankEmployeeInfoByTabNumber]", new { in_tab_number = tabNumber }, commandType: CommandType.StoredProcedure)).ToList();
                return employeeList;
            }
        }
    }
    }

