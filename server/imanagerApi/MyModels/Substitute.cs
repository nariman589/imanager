namespace imanagerApi.MyModels
{
    public class Substitute
    {
        public string UserCode { get; set; }
        public string UserName { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class AddSubstitute
    {
        public string UserCode { get; set; }
        public string Assistant_code { get; set; }
        public string Assistant_name { get; set; }
        public DateTime END_DATETIME { get; set; }
    }

    public class DeleteSubstitute
    {
        public string UserCode { get; set; }
        public string Assistant_code { get; set; }
    }

    public class EmployeeSubstitute
    {
        public string FIO { get; set; }
        public string Department { get; set; }
        public string Position { get; set; }
        public string PHONELOCAL { get; set; }
        public string Email { get; set; }
        public string LOGONNAME { get; set; }
        public int TabNumber { get; set; }
        public string IIN { get; set; }
    }
}
