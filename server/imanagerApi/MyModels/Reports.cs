
namespace imanagerApi.MyModels
{
    public class EmployeeArchive
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
}
