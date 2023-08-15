using Microsoft.AspNetCore.Mvc;
using imanagerApi.MyModels;
using imanagerApi.Core;
using imanagerApi.Controllers.Actions;

namespace imanagerApi.Controllers
{

    public class EmployeeInfoController : BaseApiController
    {
        private readonly string _connectionString;
        private readonly string _ABConnectionString;

        public EmployeeInfoController(IConfiguration configuration)
        {
            _connectionString = configuration["Db:ConnectionString"];
            _ABConnectionString = configuration["ABAccessRightsWS:ConnectionString"];
        }

        [HttpGet("Employee")]
        public async Task<ActionResult<Result<EmployeeInfo>>> GetUser(string? userLogin)
        {
            try
            {
                EmployeeActions employeeInfo = new EmployeeActions(_connectionString, _ABConnectionString);
                EmployeeInfo employee = await employeeInfo.GetUser(userLogin);
                return HandleResult(Result<EmployeeInfo>.Success(employee));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("ExecutorList")]
        public async Task<ActionResult<Result<List<Executor>>>> GetExecutorList(string userCode)
        {
            try
            {
                EmployeeActions actions = new EmployeeActions(_connectionString, _ABConnectionString);
                List<Executor> res = await actions.GetExecutorsList("tsb\\" + userCode);
                return HandleResult(Result<List<Executor>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }
    }

}


