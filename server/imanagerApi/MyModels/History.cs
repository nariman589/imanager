namespace imanagerApi.MyModels
{
    public class History
    {
        public DateTime MESSAGE_DATE { get; set; }
        public string MESSAGE_COMMENT { get; set; }
        public string EXECUTOR_CODE { get; set; }
        public string EXECUTOR_NAME { get; set; }
        public DateTime REPLY_DATE { get; set; }
        public string WAIT_SEC { get; set; }
        public string RESPONSE_RECEIVED { get; set; }
        public string USER_NAME { get; set; }
        public string EmployeePositionName { get; set; }
    }
}
