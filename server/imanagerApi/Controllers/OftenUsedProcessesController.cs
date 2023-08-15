using imanagerApi.Controllers.Actions;
using imanagerApi.Core;
using imanagerApi.MyModels;
using Microsoft.AspNetCore.Mvc;

namespace imanagerApi.Controllers
{
    public class OftenUsedProcessesController : BaseApiController
    {
        private readonly string _connectionString;
        private readonly IHttpContextAccessor _contextAccessor;

        public OftenUsedProcessesController(IConfiguration configuration, IHttpContextAccessor contextAccessor)
        {
            _connectionString = configuration["Db:ConnectionString"];
            _contextAccessor = contextAccessor;

        }
        [HttpPost("IncreaseCount")]

        public async Task<ActionResult<Result<string>>> IncreaseCount([FromBody] OftenUsedLinkId data)
        {
            try
            {
                OftenUsedProcessesActions oftenUsed = new OftenUsedProcessesActions(_connectionString);
                await oftenUsed.IncreaseCount(data.Id);
                return HandleResult(Result<string>.Success("Успешно"));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<List<string>>.Failure(ex.Message));
            }

        }
        [HttpGet("GetOftenUsedList")]
        public async Task<ActionResult<Result<List<OftenUsed>>>> GetOftenUsedLinks()
        {
            try
            {
                OftenUsedProcessesActions oftenUsed = new OftenUsedProcessesActions(_connectionString);
                List<OftenUsed> oftenUsedList = await oftenUsed.GetOftenUsedList();
                if (oftenUsedList == null || oftenUsedList.Count == 0) return HandleResult(Result<string>.Success("Список не найден"));
                return HandleResult(Result<List<OftenUsed>>.Success(oftenUsedList));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<List<string>>.Failure(ex.Message));
            }

        }
    }
}
