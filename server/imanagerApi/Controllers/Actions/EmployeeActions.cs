using System.Data.SqlClient;
using Dapper;
using imanagerApi.MyModels;
using System.Data;
using System.ServiceModel;
using System.Net;

namespace imanagerApi.Controllers.Actions
{
    public class EmployeeActions
    {
        private readonly string _connectionString;
        private readonly string _ABConnectionString;

        public EmployeeActions(string connectionString, string ABConnectionsString)
        {
            _connectionString = connectionString;
            _ABConnectionString = ABConnectionsString;
        }

        public async Task<List<Executor>> GetExecutorsList(string userCode)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                var executorsList = (await dbConnection.QueryAsync<Executor>("[LAMS].[Site].[W_GET_EXECUTOR_USERS_LIST]", new { UserCode = userCode }, commandType: System.Data.CommandType.StoredProcedure)).ToList();
                return executorsList;
            }

        }

        public async Task<EmployeeInfo> GetUser(string? userLogin)
        {
            using (var dbConnection = new SqlConnection(_connectionString))
            {
                var employee = (await dbConnection.QueryAsync<EmployeeInfo>("[LocalCache].[dbo].[GetJusanBankEmployeeInfoByLogin]", new { in_employee_login = userLogin }, commandType: System.Data.CommandType.StoredProcedure)).FirstOrDefault();

                if (employee == null || employee.EmployeeTabNumber == null) return null;

                employee.EmployeeChildrenInfo = await GetChildrenInfo(Convert.ToInt32(employee.EmployeeTabNumber));
                employee.EmployeeRecruitmentDateString = employee.EmployeeRecruitmentDate.ToShortDateString();
                employee.EmployeeCurrentPositionTransferDateString = employee.EmployeeCurrentPositionTransferDate.ToShortDateString();
                employee.EmployeePhotoUrl = await GetPhotoUrl(employee.EmployeeTabNumber);
                employee.EmployeeRole = await GetAllRoles("TSB\\" + userLogin);

                return employee;
            }

        }

        public async Task<List<string>> GetAllRoles(string? userLogin) {
            List<string> Roles = new List<string>();
            bool CheckHRRole = await CheckRole("HRPersonalAccount", "HRPersonalAccount", "C", userLogin);
            bool CheckHRHeadRole = await CheckRole("HRPersonalAccount", "HRPersonalAccount", "A", userLogin);
            bool CheckHRChiefRole = await CheckRole("HRPersonalAccount", "HRPersonalAccount", "B", userLogin);
            bool CheckHRAccountingRole = await CheckRole("HRPersonalAccount", "HRPersonalAccount", "D", userLogin);
            bool CheckInstructionAdminRole = await CheckRole("InstructionAdminAccount", "InstructionAdminAccount", "A", userLogin);
            bool CheckInstructionPersonalRole = await CheckRole("InstructionPersonalAccount", "InstructionPersonalAccount", "C", userLogin);
            if (CheckHRRole) Roles.Add("Hr");
            if (CheckHRHeadRole) Roles.Add("HrHead");
            if (CheckHRChiefRole) Roles.Add("HrChief");
            if (CheckHRAccountingRole) Roles.Add("HrAccounting");
            if (CheckInstructionAdminRole) Roles.Add("InstructionsAdmin");
            if (CheckInstructionPersonalRole) Roles.Add("InstructionsNotAdmin");
            return Roles;
        }

        public async Task<bool> CheckRole(string typeID, string objectID, string rightID, string? userCode)
        {
            using var channel = await GetAccessRightsWS();

            var request = new CheckObjectRightRequestBody()
            {
                ObjectID = objectID,
                RightID = rightID,
                TypeID = typeID,
                UserCode = userCode
            };
            var result = await channel.CheckObjectRightAsync(new CheckObjectRightRequest(request));
            return result.Body.CheckObjectRightResult;
        }


        private async Task<AccessRightsWSSoapChannel> GetAccessRightsWS()
        {
            var basicHttpBinding = new BasicHttpBinding(BasicHttpSecurityMode.TransportCredentialOnly);
            basicHttpBinding.UseDefaultWebProxy = true;
            basicHttpBinding.Security.Transport.ClientCredentialType = HttpClientCredentialType.Windows;
            var endpointAddress = new EndpointAddress(_ABConnectionString);
            var factory = new ChannelFactory<AccessRightsWSSoapChannel>(basicHttpBinding, endpointAddress);
            factory.Credentials.Windows.ClientCredential = CredentialCache.DefaultNetworkCredentials;
            AccessRightsWSSoapChannel serviceProxy = factory.CreateChannel();
            return serviceProxy;
        }

        private async Task<List<EmployeeChildrenInfo>> GetChildrenInfo(int employeeTabNumber)
        {
            using (IDbConnection dbConnection = new SqlConnection(_connectionString))
            {
                var employeeChild = await dbConnection.QueryMultipleAsync("[LocalCache].[dbo].[GetJusanEmployeesChildren]", new
                {
                    in_employee_tabnumber = employeeTabNumber
                },
                           commandType: CommandType.StoredProcedure);

                var result = employeeChild.Read<EmployeeChildrenInfo>().ToList();
                List<EmployeeChildrenInfo> childrenInfos = new List<EmployeeChildrenInfo>();

                if (result.Count > 0)
                {
                    foreach (var item in result)
                    {
                        EmployeeChildrenInfo employeeChildren = new EmployeeChildrenInfo();

                        employeeChildren.ChildFullName = item.ChildFullName;
                        employeeChildren.ChildBirthDate = item.ChildBirthDate;
                        employeeChildren.ChildBirthDateString = item.ChildBirthDate.ToShortDateString();
                        employeeChildren.ChildGender = item.ChildGender;

                        childrenInfos.Add(employeeChildren);
                    }
                }

                return childrenInfos;
            }

        }

        private async Task<string> GetPhotoUrl(string tabNumber)
        {
            string photoUrl = @"https://apps.tsb.kz:8443/Photos/" + tabNumber.PadLeft(8, '0') + ".jpg";
            return photoUrl;
        }


    }
}
