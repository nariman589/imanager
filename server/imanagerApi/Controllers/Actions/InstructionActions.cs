using Dapper;
using imanagerApi.MyModels;
using System.Data;
using System.Data.SqlClient;

namespace imanagerApi.Controllers.Actions
{
    public class InstructionActions
    {
        private readonly string _connectionString;

        public InstructionActions(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<List<Instructions>> GetInstructions()
        {

            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<Instructions>("[JusanProcesses].[ADMIN].[GetInstructionAdmin]", commandType: CommandType.StoredProcedure)).ToList();
            }

        }


        public async Task<List<Instructions>> GetInstructionsById(int id)
        {

            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<Instructions>("[JusanProcesses].[ADMIN].[GetInstructionAdminById]", new { in_instruction_id = id }, commandType: CommandType.StoredProcedure)).ToList();
            }

        }

        public async Task CreateInstruction(InstructionsCreate data)
        {

            using (var dbConnection = new SqlConnection(_connectionString))
            {
                await dbConnection.QueryAsync<InstructionsCreate>("[JusanProcesses].[ADMIN].[CreateInstructionAdmin]", new { in_instruction_name = data.InstructionName, in_instruction_branch = data.InstructionBranch, in_instruction_url = data.InstructionUrl, in_who_added = data.WhoAdded, in_when_added = data.WhenAdded, in_who_changed = data.WhoChanged, in_when_changed = data.WhenChanged }, commandType: CommandType.StoredProcedure);
            }

        }

        public async Task UpdateInstruction(InstructionsUpdate data)
        {

            using (var dbConnection = new SqlConnection(_connectionString))
            {
                await dbConnection.QueryAsync<InstructionsUpdate>("[JusanProcesses].[ADMIN].[UpdateInstructionAdmin]", new { in_instruction_id = data.InstructionId ,in_instruction_name = data.InstructionName, in_instruction_branch = data.InstructionBranch, in_instruction_url = data.InstructionUrl, in_who_changed = data.WhoChanged, in_when_changed = data.WhenChanged }, commandType: CommandType.StoredProcedure);
            }

        }

        public async Task DeleteInstruction(int id)
        {

            using (var dbConnection = new SqlConnection(_connectionString))
            {
                await dbConnection.ExecuteAsync("UPDATE [JusanProcesses].[ADMIN].[InstructionAdmin]   SET IsActual = 0   WHERE InstructionId = " + id);
            }

        }

    }
}
