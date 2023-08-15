using imanagerApi.Controllers.Actions;
using imanagerApi.Core;
using imanagerApi.MyModels;
using Microsoft.AspNetCore.Mvc;

namespace imanagerApi.Controllers
{
    public class CommonController : BaseApiController
    {
        private readonly string _connectionString;

        public CommonController(IConfiguration configurations)
        {
            _connectionString = configurations["Db:ConnectionString"];
        }

        [HttpGet("Branches")]
        public async Task<ActionResult<Result<List<Branch>>>> Branches()
        {
            try {
                CommonActions actions = new CommonActions(_connectionString);
                List<Branch> branchList = await actions.GetBranches();
                return HandleResult(Result<List<Branch>>.Success(branchList));
            }
            catch (Exception ex){
                return HandleResult(Result<string>.Failure(ex.Message));            
            }
        }

        [HttpGet("Blocks")]
        public async Task<ActionResult<Result<List<Branch>>>> Blocks(string unitCode)
        {
            try
            {
                CommonActions actions = new CommonActions(_connectionString);
                List<Branch> blockList = await actions.GetBlocks(unitCode);
                return HandleResult(Result<List<Branch>>.Success(blockList));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("ISUs")]
        public async Task<ActionResult<Result<List<Branch>>>> ISUs(string unitCode)
        {
            try
            {
                CommonActions actions = new CommonActions(_connectionString);
                List<Branch> ISUsList = await actions.GetBlocks(unitCode);
                return HandleResult(Result<List<Branch>>.Success(ISUsList));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("EmployeesBirthday")]
        public async Task<ActionResult<Result<List<Birthday>>>> EmployeesBirthday()
        {
            try
            {
                CommonActions actions = new CommonActions(_connectionString);
                List<Birthday> birthday = await actions.GetBirthday();
                return HandleResult(Result<List<Birthday>>.Success(birthday));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpPost("ConvertToPdf")]
        public async Task<ActionResult<Result<byte[]>>> ConvertToPdf([FromBody] string file)
        {
            try
            {
                CommonActions actions = new CommonActions(_connectionString);
                byte[] bytes = Convert.FromBase64String(file);
                byte[] pdf = await actions.ConvertToPDF(bytes);
                return HandleResult(Result<byte[]>.Success(pdf));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }
    }
}
