using Dapper;
using imanagerApi.Core;
using imanagerApi.MyModels;
using System.Data;
using System.Data.SqlClient;

namespace imanagerApi.Controllers.Actions
{
    public class MenuActions
    {
        private readonly string _connectionString;
        public MenuActions(string connectionString)
        {
            _connectionString = connectionString;
        }
        public async Task<List<Menu>> GetMenuByType(int menuType)
        {

            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<Menu>("[JusanProcesses].[dbo].[GetMenuList]", param: new { TypeId = menuType }, commandType: CommandType.StoredProcedure)).ToList();
            }


        }
        public async Task<List<Menu>> GetMenuByTabnumber(int menuType, int tabNumber)
        {


            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<Menu>("[JusanProcesses].[dbo].[GetMenuListByTabNumber]", param: new { TypeId = menuType, in_employee_tab_number = tabNumber }, commandType: CommandType.StoredProcedure)).ToList();
            }


        }
    }
}
