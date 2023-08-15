using imanagerApi.Controllers.Actions;
using imanagerApi.Core;
using imanagerApi.MyModels;
using Microsoft.AspNetCore.Mvc;

namespace imanagerApi.Controllers
{
    public class MenuController : BaseApiController
    {
        private readonly string _connectionString;

        public MenuController(IConfiguration configuration)
        {
            _connectionString = configuration["Db:ConnectionString"];

        }

        [HttpGet("ByType")]
        public async Task<ActionResult<Result<List<Menu>>>> GetMenuByType(int menuType)
        {
            try
            {
                MenuActions menuList = new MenuActions(_connectionString);
                List<Menu> menu = await menuList.GetMenuByType(menuType);
                return HandleResult(Result<List<Menu>>.Success(menu));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("ByTabNumber")]
        public async Task<ActionResult<Result<List<Menu>>>> GetMenuByTabNumebr(int menuType, int tabNumber)
        {
            try
            {

                MenuActions menuList = new MenuActions(_connectionString);
                List<Menu> menu = await menuList.GetMenuByTabnumber(menuType, tabNumber);
                return HandleResult(Result<List<Menu>>.Success(menu));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }
       
    }
}
