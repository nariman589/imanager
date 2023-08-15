using Dapper;
using imanagerApi.MyModels;
using System.Data;
using System.Data.SqlClient;

namespace imanagerApi.Controllers.Actions
{
    public class MessagesFolderActions
    {
        private readonly string _connectionString;
        public MessagesFolderActions(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task SetOpened(SetDate data)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                (await dbConnection.QueryAsync<CardsArchive>("[LAMS].[Site].[W_SET_DATE_OPENED]", param: new { UserCode_ = data.UserCode, Request_guid_ = data.RequestGuid }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        //--------------------------------------------------------------------------

        public async Task<List<Cards>> GetCards(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<Cards>("[LAMS].[Site].[W_GetUserMessagesList_VisaBusiness_IPJUR]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<CardsArchive>> GetArchiveCards(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<CardsArchive>("[LAMS].[Site].[W_GetUserMessagesList_VisaBusiness_IPJUR]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        //--------------------------------------------------------------------------

        public async Task<List<Hr>> GetHR(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<Hr>("[LAMS].[Site].[W_GetUserMessagesList_HRProcesses]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<HrArchive>> GetHRArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<HrArchive>("[LAMS].[Site].[W_GetUserCreditCase_HRProcesses]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<Hr>> GetPrivateBanking(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<Hr>("[JusanProcesses].[process_private_banking_back_operation].[GetUserMessagesList]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<HrArchive>> GetPrivateBankingArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<HrArchive>("[JusanProcesses].[process_private_banking_back_operation].[GetUserCreditCase]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<Hr>> GetMotivation(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<Hr>("[JusanProcesses].[process_motivationSystem].[GetUserMessagesList]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<HrArchive>> GetMotivationArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<HrArchive>("[JusanProcesses].[process_motivationSystem].[GetUserCreditCase]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<Hr>> GetPaymentCancellation(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<Hr>("[JusanProcesses].[process_dpps_paymentcancellation].[GetUserMessagesList]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<HrArchive>> GetPaymentCancellationArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<HrArchive>("[JusanProcesses].[process_dpps_paymentcancellation].[GetUserCreditCase]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<Hr>> GetPayment(string userCode)
        {
           var processes = new List<Hr>();
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                processes.Concat((await dbConnection.QueryAsync<Hr>("[JusanProcesses].[process_dpps_paymentcancellation].[GetUserMessagesList]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList());
                processes.Concat((await dbConnection.QueryAsync<Hr>("[LAMS].[Site].[W_GetUserMessagesList_PaymentProcesess]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList());
                processes.Concat((await dbConnection.QueryAsync<Hr>("[JusanProcesses].[process_internationalTransferRequest].[URPSgoupsGetMessagesList]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList());
            }
            return processes;
        }
        public async Task<List<HrArchive>> GetPaymentArchive(string userCode) 
        {
           var processes = new List<HrArchive>();
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                processes.Concat((await dbConnection.QueryAsync<HrArchive>("[JusanProcesses].[process_dpps_paymentcancellation].[GetUserCreditCase]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList());
                processes.Concat((await dbConnection.QueryAsync<HrArchive>("[LAMS].[Site].[W_GetUserCreditCase_PaymentProcesess]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList());
                processes.Concat((await dbConnection.QueryAsync<HrArchive>("[JusanProcesses].[process_internationalTransferRequest].[URPSgoupsArhive]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList());
            }
            return processes;
        }
        
        public async Task<List<Hr>> GetNCA(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<Hr>("[JusanProcesses].[process_ncaoperation].[GetUserMessagesList]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<HrArchive>> GetNCAArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<HrArchive>("[JusanProcesses].[process_ncaoperation].[GetUserCreditCase]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<Hr>> GetInternalDocument(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<Hr>("[LAMS].[Site].[W_GetUserMessagesList_InternalDocument]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<HrArchive>> GetInternalDocumentArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<HrArchive>("[LAMS].[Site].[W_GetUserCreditCaseInternalDocument]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<Hr>> GetDisputTransaction(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<Hr>("[JusanProcesses].[Process_DisputTransaction].[GetUserMessagesList]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<HrArchive>> GetDisputTransactionArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<HrArchive>("[JusanProcesses].[Process_DisputTransaction].[GetUserCreditCase]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<Hr>> GetDisputTransactionCard(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<Hr>("[LAMS].[Site].[W_GetUserMessagesList_DisputTransaction]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<HrArchive>> GetDisputTransactionCardArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<HrArchive>("[LAMS].[Site].[W_GetUserCreditCaseDisputTransaction]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        //--------------------------------------------------------------------------
        public async Task<List<PaymentDeadline>> GetPaymentDeadlines(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<PaymentDeadline>("[LAMS].[Site].[W_GetUserMessagesList_PaymentDeadLine]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<PaymentDeadlineArchive>> GetPaymentDeadlinesArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<PaymentDeadlineArchive>("[LAMS].[Site].[W_GetUserCreditCase_PaymentDeadLine]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        //--------------------------------------------------------------------------
        public async Task<List<IPVProcesses>> GetIPV(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<IPVProcesses>("[LAMS].[Site].[W_GetUserMessagesList_IPV]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<IPVArchive>> GetIPVArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<IPVArchive>("[LAMS].[Site].[W_GetUserCreditCase_IPV]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }
        //--------------------------------------------------------------------------

        public async Task<List<AHDProcesses>> GetAHD(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<AHDProcesses>("[LAMS].[Site].[W_GetUserMessagesList_AHDProcesses]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<AHDEmployeeArchive>> GetAHDArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<AHDEmployeeArchive>("[LAMS].[Site].[W_GetUserCreditCase_AHDProcesses]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        //--------------------------------------------------------------------------

        public async Task<List<ATMRelocationProcesses>> GetATM(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<ATMRelocationProcesses>("[LAMS].[Site].[W_GetUserMessagesList_ATMRelocation]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<ATMRelocationEmployeeArchive>> GetATMArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<ATMRelocationEmployeeArchive>("[LAMS].[Site].[W_GetUserCreditCase_ATMRelocation]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        //--------------------------------------------------------------------------

        public async Task<List<InternationalTransferRequestProcesses>> GetInternationalTransfers(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<InternationalTransferRequestProcesses>("[LAMS].[Site].[W_GetUserMessagesList_InternationalTransferRequest]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<InternationalTransferRequestArhive>> GetInternationalTransfersArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<InternationalTransferRequestArhive>("[LAMS].[Site].[W_GetUserCreditCaseinternationalTransferRequest]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        //--------------------------------------------------------------------------
        public async Task<List<TreasureApprovesProcess>> GetTreasure(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<TreasureApprovesProcess>("[LAMS].[Site].[W_GetUserMessagesList_TreasuryApproves]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }

        public async Task<List<TreasureApprovesArhive>> GetTreasureArchive(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                return (await dbConnection.QueryAsync<TreasureApprovesArhive>("[LAMS].[Site].[W_GetUserCreditCaseTreasureApproves]", param: new { UserCode_ = userCode }, commandType: CommandType.StoredProcedure)).ToList();
            }
        }


    }
}
