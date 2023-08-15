using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imanagerApi.MyModels
{
    public class Configuration
    {
        public MenuConfiguration Menu { get; set; }
        public string ServerLink { get; set; }
        public Db Db { get; set; }
        public APIConfiguration MailApi { get; set; }
        public APIConfiguration DocumentApi { get; set; }
        public APIConfiguration SignDocumentApi { get; set; }
        public APIConfiguration SignerApi { get; set; }
        public APIConfiguration ABAccessRightsWS { get; set; }
        public MailSettings MailSettings { get; set; }
        public Procedure Procedure { get; set; }
        public NotifyUsers NotifyUsers { get; set; }
        public ReportAccess ReportAccess { get; set; }
    }

    public class MenuConfiguration
    {
        public int SidebarMenuId { get; set; }
        public int OtherMenuId { get; set; }
        public MenuType MenuType { get; set; }
    }

    public class MenuType
    {
        public int MainMenu { get; set; }
        public int OtherMenu { get; set; }
    }

    public class Db
    {
        public string ConnectionString { get; set; }
    }

    public class APIConfiguration
    {
        public string ConnectionString { get; set; }
    }

    public class MailSettings
    {
        public string FromEmail { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }

    public class Procedure
    {
        public string BranchesProcedure { get; set; }
        public string BlocksProcedure { get; set; }
        public string ISUsProcedure { get; set; }

    }

    public class NotifyUsers
    {
        public string Head { get; set; }
        public string Chief { get; set; }
    }

    public class ReportAccess
    {
        public List<int> OfficeCode { get; set; }

        //public int OfficeCode { get; set; }

    }

}
