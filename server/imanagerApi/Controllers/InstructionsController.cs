using imanagerApi.Controllers.Actions;
using imanagerApi.Core;
using imanagerApi.MyModels;
using Microsoft.AspNetCore.Mvc;

namespace imanagerApi.Controllers
{
    public class InstructionsController : BaseApiController
    {
        private readonly string _connectionString;

        public InstructionsController (IConfiguration configurations)
        {
            _connectionString = configurations["Db:ConnectionString"];
        }

        [HttpGet("All")]
        public async Task<ActionResult<Result<List<Instructions>>>> Instructions() {
            try
            {
                InstructionActions actions = new InstructionActions(_connectionString);
                List<Instructions> instructions = await actions.GetInstructions();
                return HandleResult(Result<List<Instructions>>.Success(instructions));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("ById")]
        public async Task<ActionResult<Result<List<Instructions>>>> InstructionsById(int Id)
        {
            try
            {
                InstructionActions actions = new InstructionActions(_connectionString);
                List<Instructions> instructions = await actions.GetInstructionsById(Id);
                return HandleResult(Result<List<Instructions>>.Success(instructions));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpPost("Create")]
        public async Task<ActionResult<string>> InstructionsCreate([FromBody] InstructionsCreate data)
        {
            try
            {
                InstructionActions actions = new InstructionActions(_connectionString);
                await actions.CreateInstruction(data);
                return HandleResult(Result<string>.Success("Успешно"));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpPatch("Update")]
        public async Task<ActionResult<string>> InstructionsUpdate([FromBody] InstructionsUpdate data)
        {
            try
            {
                InstructionActions actions = new InstructionActions(_connectionString);
                await actions.UpdateInstruction(data);
                return HandleResult(Result<string>.Success("Успешно"));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpDelete("Delete")]
        public async Task<ActionResult<string>> InstructionsDelete([FromBody] InstructionId data)
        {
            try
            {
                InstructionActions actions = new InstructionActions(_connectionString);
                await actions.DeleteInstruction(data.Id);
                return HandleResult(Result<string>.Success("Успешно"));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }
    }
}
