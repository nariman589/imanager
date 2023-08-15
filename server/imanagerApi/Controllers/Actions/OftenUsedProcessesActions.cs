using Dapper;
using imanagerApi.MyModels;
using System.Data;
using System.Data.SqlClient;

namespace imanagerApi.Controllers.Actions
{
    public class OftenUsedProcessesActions
    {
        private readonly string _connectionString;

        public object ID { get; private set; }

        public OftenUsedProcessesActions(string connectionString)
        {
            _connectionString = connectionString;
        }
        public async Task IncreaseCount(int ID)
        {

            using (var dbConnection = new SqlConnection(_connectionString))
            {
                await dbConnection.QueryAsync("[JusanProcesses].[dbo].[IncreaseUsedCounts]", param: new { ID }, commandType: CommandType.StoredProcedure);
            }


        }
        public async Task<List<OftenUsed>> GetOftenUsedList()
        {

            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<OftenUsed>("[JusanProcesses].[dbo].[GetOftenUsedLinks]", commandType: CommandType.StoredProcedure)).ToList();
            }


        }
    }
}
