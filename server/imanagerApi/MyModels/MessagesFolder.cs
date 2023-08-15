namespace imanagerApi.MyModels
{
    public class Cards
    {
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public string SCHEME_ID { get; set; }
        public Guid REQUEST_GUID { get; set; }
        public DateTime OPEN_DATETIME { get; set; }
        public string OPEN_USERCODE { get; set; }
        public string response_required { get; set; }
        public DateTime MESSAGE_DATE { get; set; }
        public string BRANCHNAME { get; set; }
        public string DEPNAME { get; set; }
        public string Status { get; set; }
        public string RegistrationNumber { get; set; }
        public string CLIENT_NAME { get; set; }
        public string InitiatorEmployeeFullName { get; set; }
        public string ProcessName { get; set; }
        public string DocumentName { get; set; }

        public string PlasticOrderingLibraryBranchName { get; set; }
        public string PlasticOrderingLibraryRoomName { get; set; }
        public string PlasticOrderingSegmentName { get; set; }
        public string PlasticOrderingPlasticTypeName { get; set; }
        public string PlasticOrderingQuantity { get; set; }
    };
    public class CardsArchive
    {
        public Guid ProcessGuid { get; set; }
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public DateTime StartDate { get; set; }
        public string PROCESS_STATUS { get; set; }
        public string Status { get; set; }
        public string ProcessName { get; set; }
        public string INITIATOR_NAME { get; set; }
        public string Registration_Number { get; set; }
        public string CandidateFullName { get; set; }
        public string BlockName { get; set; }
        public string OfficeName { get; set; }
        public string OperationTypeName { get; set; }
        public string OperationSubTypeName { get; set; }
        public string DocumentName { get; set; }
    };
    public class Hr
    {
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public string SCHEME_ID { get; set; }
        public Guid REQUEST_GUID { get; set; }
        public DateTime OPEN_DATETIME { get; set; }
        public string OPEN_USERCODE { get; set; }
        public string response_required { get; set; }
        public DateTime MESSAGE_DATE { get; set; }
        public string BRANCHNAME { get; set; }
        public string DEPNAME { get; set; }
        public string Status { get; set; }
        public string RegistrationNumber { get; set; }
        public string CLIENT_NAME { get; set; }
        public string InitiatorEmployeeFullName { get; set; }
        public string ProcessName { get; set; }
        public string DocumentName { get; set; }
        public string ReasonName { get; set; }
        public string SubReasonName { get; set; }
        public string ATMLocation { get; set; }
    };
    public class SetDate
    {
        public string UserCode { get; set; }
        public string RequestGuid { get; set; }
    };

    public class PaymentDeadline
    {
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public string SCHEME_ID { get; set; }
        public Guid REQUEST_GUID { get; set; }
        public DateTime OPEN_DATETIME { get; set; }
        public string OPEN_USERCODE { get; set; }
        public string response_required { get; set; }
        public DateTime MESSAGE_DATE { get; set; }
        public string BRANCHNAME { get; set; }
        public string DEPNAME { get; set; }
        public string Status { get; set; }
        public string RegistrationNumber { get; set; }
        public string CLIENT_NAME { get; set; }
        public string InitiatorEmployeeFullName { get; set; }
        public string ProcessName { get; set; }
        public string DocumentName { get; set; }
    };
    public class PaymentDeadlineArchive
    {
        public Guid ProcessGuid { get; set; }
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public DateTime StartDate { get; set; }
        public string PROCESS_STATUS { get; set; }
        public string Status { get; set; }
        public string ProcessName { get; set; }
        public string INITIATOR_NAME { get; set; }
        public string Registration_Number { get; set; }
        public string CandidateFullName { get; set; }
        public string BlockName { get; set; }
        public string OfficeName { get; set; }
        public string OperationTypeName { get; set; }
        public string OperationSubTypeName { get; set; }
        public string DocumentName { get; set; }
    };

    public class HrArchive
    {
        public Guid ProcessGuid { get; set; }
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
        public string PROCESS_STATUS { get; set; }
        public string Status { get; set; }
        public string ProcessName { get; set; }
        public string INITIATOR_NAME { get; set; }
        public string Registration_Number { get; set; }
        public string CandidateFullName { get; set; }
        public string BlockName { get; set; }
        public string OfficeName { get; set; }
        public string OperationTypeName { get; set; }
        public string OperationSubTypeName { get; set; }
        public string DocumentName { get; set; }
    }

    public class InternationalTransferRequestProcesses
    {
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public string SCHEME_ID { get; set; }
        public Guid REQUEST_GUID { get; set; }
        public DateTime OPEN_DATETIME { get; set; }
        public string OPEN_USERCODE { get; set; }
        public string response_required { get; set; }
        public DateTime MESSAGE_DATE { get; set; }
        public string BRANCHNAME { get; set; }
        public string DEPNAME { get; set; }
        public string Status { get; set; }
        public string RegistrationNumber { get; set; }
        public string CLIENT_NAME { get; set; }
        public string InitiatorEmployeeFullName { get; set; }
        public string ProcessName { get; set; }
        public string DocumentName { get; set; }
        public string ReasonName { get; set; }
        public string SubReasonName { get; set; }
        public string ATMLocation { get; set; }

    }

    public class InternationalTransferRequestArhive
    {
        public Guid ProcessGuid { get; set; }
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public DateTime StartDate { get; set; }
        public string PROCESS_STATUS { get; set; }
        public string Status { get; set; }
        public string ProcessName { get; set; }
        public string INITIATOR_NAME { get; set; }
        public string Registration_Number { get; set; }
        public string CandidateFullName { get; set; }
        public string BlockName { get; set; }
        public string OfficeName { get; set; }
        public string OperationTypeName { get; set; }
        public string OperationSubTypeName { get; set; }
        public string DocumentName { get; set; }
    }

    public class IPVProcesses
    {
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public string SCHEME_ID { get; set; }
        public Guid REQUEST_GUID { get; set; }
        public DateTime OPEN_DATETIME { get; set; }
        public string OPEN_USERCODE { get; set; }
        public string response_required { get; set; }
        public DateTime MESSAGE_DATE { get; set; }
        public string BRANCHNAME { get; set; }
        public string DEPNAME { get; set; }
        public string Status { get; set; }
        public string RegistrationNumber { get; set; }
        public string CLIENT_NAME { get; set; }
        public string InitiatorEmployeeFullName { get; set; }
        public string ProcessName { get; set; }
        public string DocumentName { get; set; }


    }

    public class IPVArchive
    {
        public Guid ProcessGuid { get; set; }
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public DateTime StartDate { get; set; }
        public string PROCESS_STATUS { get; set; }
        public string Status { get; set; }
        public string ProcessName { get; set; }
        public string INITIATOR_NAME { get; set; }
        public string Registration_Number { get; set; }
        public string CandidateFullName { get; set; }
        public string BlockName { get; set; }
        public string OfficeName { get; set; }
        public string OperationTypeName { get; set; }
        public string OperationSubTypeName { get; set; }
        public string DocumentName { get; set; }
    }

    public class TreasureApprovesProcess
    {
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public string SCHEME_ID { get; set; }
        public Guid REQUEST_GUID { get; set; }
        public DateTime OPEN_DATETIME { get; set; }
        public string OPEN_USERCODE { get; set; }
        public string response_required { get; set; }
        public DateTime MESSAGE_DATE { get; set; }

        public string Status { get; set; }
        public string RegistrationNumber { get; set; }
        public string Chanel { get; set; }
        public string Payer_BIN_IIN { get; set; }
        public string Payer_BIN_IINDescription { get; set; }
        public string Payer_Amount { get; set; }
        public string ProcessName { get; set; }
        public string DocumentName { get; set; }
    }
    public class TreasureApprovesArhive
    {
        public Guid ProcessGuid { get; set; }
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public DateTime StartDate { get; set; }
        public string PROCESS_STATUS { get; set; }
        public string Status { get; set; }
        public string ProcessName { get; set; }
        public string Chanel { get; set; }
        public string Payer_BIN_IIN { get; set; }
        public string Payer_BIN_IINDescription { get; set; }
        public string Payer_Amount { get; set; }

        public string Registration_Number { get; set; }
        public string OperationTypeName { get; set; }
        public string OperationSubTypeName { get; set; }
        public string DocumentName { get; set; }
    }
    public class AHDProcesses
    {
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public string SCHEME_ID { get; set; }
        public Guid REQUEST_GUID { get; set; }
        public DateTime OPEN_DATETIME { get; set; }
        public string OPEN_USERCODE { get; set; }
        public string response_required { get; set; }
        public DateTime MESSAGE_DATE { get; set; }
        public string BRANCHNAME { get; set; }
        public string DEPNAME { get; set; }
        public string Status { get; set; }
        public string RegistrationNumber { get; set; }
        public string CLIENT_NAME { get; set; }
        public string InitiatorEmployeeFullName { get; set; }
        public string ProcessName { get; set; }
        public string DocumentName { get; set; }

    }
    public class AHDEmployeeArchive
    {
        public Guid ProcessGuid { get; set; }
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public DateTime StartDate { get; set; }
        public string PROCESS_STATUS { get; set; }
        public string Status { get; set; }
        public string ProcessName { get; set; }
        public string INITIATOR_NAME { get; set; }
        public string Registration_Number { get; set; }
        public string CandidateFullName { get; set; }
        public string BlockName { get; set; }
        public string OfficeName { get; set; }
        public string OperationTypeName { get; set; }
        public string OperationSubTypeName { get; set; }
        public string DocumentName { get; set; }
    }

    public class ATMRelocationProcesses
    {
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public string SCHEME_ID { get; set; }
        public Guid REQUEST_GUID { get; set; }
        public DateTime OPEN_DATETIME { get; set; }
        public string OPEN_USERCODE { get; set; }
        public string response_required { get; set; }
        public DateTime MESSAGE_DATE { get; set; }
        public string BRANCHNAME { get; set; }
        public string DEPNAME { get; set; }
        public string Status { get; set; }
        public string RegistrationNumber { get; set; }
        public string CLIENT_NAME { get; set; }
        public string InitiatorEmployeeFullName { get; set; }
        public string ProcessName { get; set; }
        public string DocumentName { get; set; }

    }

    public class ATMRelocationEmployeeArchive
    {
        public Guid ProcessGuid { get; set; }
        public string ProcessCode { get; set; }
        public string ProcessVersion { get; set; }
        public DateTime StartDate { get; set; }
        public string PROCESS_STATUS { get; set; }
        public string Status { get; set; }
        public string ProcessName { get; set; }
        public string INITIATOR_NAME { get; set; }
        public string Registration_Number { get; set; }
        public string CandidateFullName { get; set; }
        public string BlockName { get; set; }
        public string OfficeName { get; set; }
        public string OperationTypeName { get; set; }
        public string OperationSubTypeName { get; set; }
        public string DocumentName { get; set; }
    }
}
