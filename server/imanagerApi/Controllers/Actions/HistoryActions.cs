using Dapper;
using imanagerApi.MyModels;
using System.Data;
using System.Data.SqlClient;

namespace imanagerApi.Controllers.Actions
{
    public class HistoryActions
    {
        private readonly string _connectionString;

        public HistoryActions(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<History>> GetHistoryById(string processGuid)
        {
            using(var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<History>("[LAMS].[Site].[W_GET_PROCESS_MESSAGES_HISTORY_JYSAN_NEW]", new
                {
                    ProcessGuid_ = processGuid
                },
                commandType: CommandType.StoredProcedure
                )).ToList();
            }
        }
    }
}
