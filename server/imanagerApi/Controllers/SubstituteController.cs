using imanagerApi.Controllers.Actions;
using imanagerApi.Core;
using imanagerApi.MyModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace imanagerApi.Controllers
{
    public class SubstituteController : BaseApiController
    {
        private readonly string _connectionString;

        public SubstituteController(IConfiguration configurations, IHttpContextAccessor httpContextAccessor)
        {
            _connectionString = configurations["Db:ConnectionString"];
        }

        [HttpGet("All")]
        public async Task<ActionResult<Result<List<Substitute>>>> SubstituteList(string userLogin)
        {
            try
            {
                SubstituteActions actions = new SubstituteActions(_connectionString);
                List<Substitute> assistantList = await actions.GetSubstituteList("tsb\\" + userLogin);
                return HandleResult(Result<List<Substitute>>.Success(assistantList));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpPost("Add")]
        public async Task<ActionResult<Result<string>>> SubstituteAdd(AddSubstitute user)
        {
            try
            {
                SubstituteActions actions = new SubstituteActions(_connectionString);
                await actions.AddSubstitute(user);
                return HandleResult(Result<string>.Success("Успешно"));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpDelete("Delete")]
        public async Task<ActionResult<Result<string>>> SubstituteDelete(DeleteSubstitute user)
        {
            try
            {
                SubstituteActions actions = new SubstituteActions(_connectionString);
                await actions.DeleteSubstitute(user);
                return HandleResult(Result<string>.Success("Успешно"));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("Get")]
        public async Task<ActionResult<Result<List<EmployeeSubstitute>>>> GetSubstitute(string? term = null, int? tabNumber = null)
        {
            try
            {
                SubstituteActions actions = new SubstituteActions(_connectionString);
                if(term != null) { 
                return HandleResult(Result<List< EmployeeSubstitute >>.Success(await actions.GetSubstituteEmployee(term)));
                }
                return HandleResult(Result<List<EmployeeSubstitute>>.Success(await actions.GetSubstituteEmployeeByTubNumber(tabNumber)));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }
    }
}
