using Dapper;
using imanagerApi.MyModels;
using System.Data;
using System.Data.SqlClient;

namespace imanagerApi.Controllers.Actions
{
    public class CommonActions
    {
        private readonly string _connectionString;

        public CommonActions(string connectionString)
        {
            _connectionString = connectionString;
        }

     

        public async Task<List<Branch>> GetBranches ()
        {
            using (var dBConnection = new SqlConnection(_connectionString)) {
                var BranchesList = (await dBConnection.QueryAsync<Branch>("[LocalCache].[jusan].[GetBranches]", commandType: CommandType.StoredProcedure)).ToList();
                return BranchesList;
            }
        }

        public async Task<List<Branch>> GetBlocks(string unitCode)
        {
            using (var dBConnection = new SqlConnection(_connectionString))
            {
                var BranchesList = (await dBConnection.QueryAsync<Branch>("[LocalCache].[jusan].[GetBlocksByUnitCode]", new { in_unit_code = unitCode },commandType: CommandType.StoredProcedure)).ToList();
                return BranchesList;
            }
        }
        public async Task<List<Branch>> GetISUs(string unitCode)
        {
            using (var dBConnection = new SqlConnection(_connectionString))
            {
                var BranchesList = (await dBConnection.QueryAsync<Branch>("[LocalCache].[jusan].[GetRecursiveIndependentStructuralUnitsByUnitCode]", new { in_unit_code = unitCode }, commandType: CommandType.StoredProcedure)).ToList();
                return BranchesList;
            }
        }

        public async Task<List<Birthday>> GetBirthday()
        {
            using (var dBConnection = new SqlConnection(_connectionString))
            {
                var BranchesList = (await dBConnection.QueryAsync<Birthday>("[LocalCache].[jusan].[GetEmployeesWithBirthdayToday]", commandType: CommandType.StoredProcedure)).ToList();
                return BranchesList;
            }
        }

        public async Task<byte[]> ConvertToPDF(byte[] file)
        {
          
                byte[] pdfbytes;
                using (MemoryStream stream = new MemoryStream(file))
                {

                 Aspose.Words.Document doc = new Aspose.Words.Document(stream);
                    using (MemoryStream outStream = new MemoryStream())
                    {
                        doc.Save(outStream, Aspose.Words.SaveFormat.Pdf);
                        await outStream.CopyToAsync(outStream);
                        pdfbytes = outStream.ToArray();
                    }
                }

                return pdfbytes;
           
        }
    }
}
