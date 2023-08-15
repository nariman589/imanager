using imanagerApi.Controllers.Actions;
using imanagerApi.Core;
using imanagerApi.MyModels;
using Microsoft.AspNetCore.Mvc;

namespace imanagerApi.Controllers
{
    public class HistoryController : BaseApiController
    {
        private readonly string _connectionString;

        public HistoryController(IConfiguration configuration)
        {
            _connectionString = configuration["Db:ConnectionString"];
        }

        [HttpGet("ById")]
        public async Task<ActionResult<Result<List<History>>>> History (string processGuid)
        {
            try { 
            HistoryActions actions = new HistoryActions(_connectionString);
            var history = await actions.GetHistoryById(processGuid);
            return HandleResult(Result<List<History>>.Success(history));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }
    }
}
