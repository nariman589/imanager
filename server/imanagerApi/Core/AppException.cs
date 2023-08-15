namespace imanagerApi.Core
{
    public class AppException
    {
        public AppException( string message)
        {
            IsSuccess = false;
            error = message;
            value = null;
        }

        public bool IsSuccess { get; set; }
        public string error { get; set; }
        public string value { get; set; }

    }
}