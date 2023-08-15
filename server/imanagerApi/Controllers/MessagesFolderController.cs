using imanagerApi.Controllers.Actions;
using imanagerApi.Core;
using imanagerApi.MyModels;
using Microsoft.AspNetCore.Mvc;

namespace imanagerApi.Controllers
{
    public class MessagesFolderController : BaseApiController
    {
        private readonly string _connectionString;

        public MessagesFolderController(IConfiguration configurations)
        {
            _connectionString = configurations["Db:ConnectionString"];
        }

        [HttpPost("SetOpened")]
        public async Task<ActionResult<Result<string>>> Opened(SetDate data)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                await actions.SetOpened(data);
                return HandleResult(Result<string>.Success("Успешно"));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        //--------------------------------------------------------------------------

        [HttpGet("AllCards")]
        public async Task<ActionResult<Result<List<Cards>>>> Cards(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<Cards> res = await actions.GetCards("tsb\\" + userCode);
                return HandleResult(Result<List<Cards>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("AllCardsArchive")]
        public async Task<ActionResult<Result<List<CardsArchive>>>> CardsArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<CardsArchive> res = await actions.GetArchiveCards("tsb\\" + userCode);
                return HandleResult(Result<List<CardsArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }
        //--------------------------------------------------------------------------------------------
        [HttpGet("AllHr")]
        public async Task<ActionResult<Result<List<Hr>>>> Hr(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<Hr> res = await actions.GetHR("tsb\\" + userCode);
                return HandleResult(Result<List<Hr>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("AllHrArchive")]
        public async Task<ActionResult<Result<List<HrArchive>>>> HrArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<HrArchive> res = await actions.GetHRArchive("tsb\\" + userCode);
                return HandleResult(Result<List<HrArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("PrivateBanking")]
        public async Task<ActionResult<Result<List<Hr>>>> PrivateBanking(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<Hr> res = await actions.GetPrivateBanking("tsb\\" + userCode);
                return HandleResult(Result<List<Hr>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("PrivateBankingArchive")]
        public async Task<ActionResult<Result<List<HrArchive>>>> PrivateBankingArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<HrArchive> res = await actions.GetPrivateBankingArchive("tsb\\" + userCode);
                return HandleResult(Result<List<HrArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("Motivation")]
        public async Task<ActionResult<Result<List<Hr>>>> Motivation(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<Hr> res = await actions.GetMotivation("tsb\\" + userCode);
                return HandleResult(Result<List<Hr>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("MotivationArchive")]
        public async Task<ActionResult<Result<List<HrArchive>>>> MotivationArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<HrArchive> res = await actions.GetMotivationArchive("tsb\\" + userCode);
                return HandleResult(Result<List<HrArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("PaymentCancellation")]
        public async Task<ActionResult<Result<List<Hr>>>> PaymentCancellation(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<Hr> res = await actions.GetPaymentCancellation("tsb\\" + userCode);
                return HandleResult(Result<List<Hr>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("PaymentCancellationArchive")]
        public async Task<ActionResult<Result<List<HrArchive>>>> PaymentCancellationArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<HrArchive> res = await actions.GetPaymentCancellationArchive("tsb\\" + userCode);
                return HandleResult(Result<List<HrArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("NCA")]
        public async Task<ActionResult<Result<List<Hr>>>> NCA(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<Hr> res = await actions.GetNCA("tsb\\" + userCode);
                return HandleResult(Result<List<Hr>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("NCAArchive")]
        public async Task<ActionResult<Result<List<HrArchive>>>> NCAArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<HrArchive> res = await actions.GetNCAArchive("tsb\\" + userCode);
                return HandleResult(Result<List<HrArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("InternalDocument")]
        public async Task<ActionResult<Result<List<Hr>>>> InternalDocument(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<Hr> res = await actions.GetInternalDocument("tsb\\" + userCode);
                return HandleResult(Result<List<Hr>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("InternalDocumentArchive")]
        public async Task<ActionResult<Result<List<HrArchive>>>> InternalDocumentArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<HrArchive> res = await actions.GetInternalDocumentArchive("tsb\\" + userCode);
                return HandleResult(Result<List<HrArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("DisputTransaction")]
        public async Task<ActionResult<Result<List<Hr>>>> DisputTransaction(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<Hr> res = await actions.GetDisputTransaction("tsb\\" + userCode);
                return HandleResult(Result<List<Hr>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("DisputTransactionArchive")]
        public async Task<ActionResult<Result<List<HrArchive>>>> DisputTransactionArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<HrArchive> res = await actions.GetPrivateBankingArchive("tsb\\" + userCode);
                return HandleResult(Result<List<HrArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("DisputTransactionCard")]
        public async Task<ActionResult<Result<List<Hr>>>> DisputTransactionCard(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<Hr> res = await actions.GetDisputTransactionCard("tsb\\" + userCode);
                return HandleResult(Result<List<Hr>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("DisputTransactionCardArchive")]
        public async Task<ActionResult<Result<List<HrArchive>>>> DisputTransactionCardArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<HrArchive> res = await actions.GetPrivateBankingArchive("tsb\\" + userCode);
                return HandleResult(Result<List<HrArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        //--------------------------------------------------------------------------

        [HttpGet("PaymentDeadlines")]
        public async Task<ActionResult<Result<List<PaymentDeadline>>>> PaymentDeadlines(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<PaymentDeadline> res = await actions.GetPaymentDeadlines("tsb\\" + userCode);
                return HandleResult(Result<List<PaymentDeadline>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("PaymentDeadlinesArchive")]
        public async Task<ActionResult<Result<List<PaymentDeadlineArchive>>>> PaymentDeadlinesArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<PaymentDeadlineArchive> res = await actions.GetPaymentDeadlinesArchive("tsb\\" + userCode);
                return HandleResult(Result<List<PaymentDeadlineArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }
        //--------------------------------------------------------------------------

        [HttpGet("Payment")]
        public async Task<ActionResult<Result<List<Hr>>>> Payment(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<Hr> res = await actions.GetPayment("tsb\\" + userCode);
                return HandleResult(Result<List<Hr>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("PaymentArchive")]
        public async Task<ActionResult<Result<List<HrArchive>>>> PaymentArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<HrArchive> res = await actions.GetPaymentArchive("tsb\\" + userCode);
                return HandleResult(Result<List<HrArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        //--------------------------------------------------------------------------

        [HttpGet("IPV")]
        public async Task<ActionResult<Result<List<IPVProcesses>>>> IPV(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<IPVProcesses> res = await actions.GetIPV("tsb\\" + userCode);
                return HandleResult(Result<List<IPVProcesses>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("IPVArchive")]
        public async Task<ActionResult<Result<List<IPVArchive>>>> IPVArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<IPVArchive> res = await actions.GetIPVArchive("tsb\\" + userCode);
                return HandleResult(Result<List<IPVArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        //--------------------------------------------------------------------------

        [HttpGet("AHD")]
        public async Task<ActionResult<Result<List<AHDProcesses>>>> AHD(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<AHDProcesses> res = await actions.GetAHD("tsb\\" + userCode);
                return HandleResult(Result<List<AHDProcesses>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("AHDArchive")]
        public async Task<ActionResult<Result<List<AHDEmployeeArchive>>>> AHDArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<AHDEmployeeArchive> res = await actions.GetAHDArchive("tsb\\" + userCode);
                return HandleResult(Result<List<AHDEmployeeArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        //--------------------------------------------------------------------------

        [HttpGet("ATM")]
        public async Task<ActionResult<Result<List<ATMRelocationProcesses>>>> ATM(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<ATMRelocationProcesses> res = await actions.GetATM("tsb\\" + userCode);
                return HandleResult(Result<List<ATMRelocationProcesses>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("ATMArchive")]
        public async Task<ActionResult<Result<List<ATMRelocationEmployeeArchive>>>> ATMArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<ATMRelocationEmployeeArchive> res = await actions.GetATMArchive("tsb\\" + userCode);
                return HandleResult(Result<List<ATMRelocationEmployeeArchive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        //--------------------------------------------------------------------------

        [HttpGet("Treasure")]
        public async Task<ActionResult<Result<List<TreasureApprovesProcess>>>> Treasure(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<TreasureApprovesProcess> res = await actions.GetTreasure("tsb\\" + userCode);
                return HandleResult(Result<List<TreasureApprovesProcess>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("TreasureArchive")]
        public async Task<ActionResult<Result<List<TreasureApprovesArhive>>>> TreasureArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<TreasureApprovesArhive> res = await actions.GetTreasureArchive("tsb\\" + userCode);
                return HandleResult(Result<List<TreasureApprovesArhive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        //--------------------------------------------------------------------------

        [HttpGet("International")]
        public async Task<ActionResult<Result<List<InternationalTransferRequestProcesses>>>> International(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<InternationalTransferRequestProcesses> res = await actions.GetInternationalTransfers("tsb\\" + userCode);
                return HandleResult(Result<List<InternationalTransferRequestProcesses>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }

        [HttpGet("InternationalArchive")]
        public async Task<ActionResult<Result<List<InternationalTransferRequestArhive>>>> InternationalArchive(string userCode)
        {
            try
            {
                MessagesFolderActions actions = new MessagesFolderActions(_connectionString);
                List<InternationalTransferRequestArhive> res = await actions.GetInternationalTransfersArchive("tsb\\" + userCode);
                return HandleResult(Result<List<InternationalTransferRequestArhive>>.Success(res));
            }
            catch (Exception ex)
            {
                return HandleResult(Result<string>.Failure(ex.Message));
            }
        }
    }
}
