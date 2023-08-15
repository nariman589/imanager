namespace imanagerApi.MyModels
{
    public class SapEvent
    {
        public string ID { get; set; }
        public string Name { get; set; }
    }
    public class Confirm
    {
        public string id { get; set; }
        public string execTabNum { get; set; }
    }
    public class FakeQr
    {
        public string pdfDocument { get; set; }
        public string type { get; set; }
        public Signer signer { get; set; }
    }
  
    public class PostToPortal
    {

        public string file { get; set; }
        public string fileName { get; set; }
        public string candidateIin { get; set; }

        public string keyName { get; set; }
    }
    public class ConfirmList
    {
        public List<Document> documents { get; set; }
        public string execTabNum { get; set; }
    }
    public class DocumentsList
    {
        public List<Document> documents { get; set; }
    }
    public class Document
    {
        public Guid id { get; set; }
        public int? executorTabNum { get; set; }
        public int? employeeTabNum { get; set; }
        public string? employeeFullName { get; set; }
        public string? employeeIIN { get; set; }
        public string? employeeBranchName { get; set; }
        public string? employeeDepName { get; set; }
        public string sapEventId { get; set; }
        public string sapEventName { get; set; }
        public DateTime createTime { get; set; }
        public int status { get; set; }
        public string? statusCode { get; set; }
        public string? statusDesc { get; set; }
        public string regNum { get; set; }
        public string regDate { get; set; }
        public List<Attachment>? files { get; set; }
        public string? executorFullName { get; set; }
        public DateTime? employeeGetDocTime { get; set; }
        public string employeeShortName
        {
            get
            {
                return getShortName(employeeFullName);
            }
        }

        public string? executorShortName
        {
            get
            {
                return getShortName(executorFullName);
            }
        }

        public string? accountingFullName { get; set; }

        private string getShortName(string fullName)
        {
            if (string.IsNullOrEmpty(fullName))
                return "";

            if (fullName.Contains("---"))
                return fullName;

            var splitArr = fullName.Split(" ");

            return $"{splitArr[0]} {splitArr[1].Substring(0, 1)}.";
        }

        /// <summary>
        /// Признак необходимости подтверждения и подписи руководителя ДРЧК
        /// </summary>
        public bool isNeedHRChief { get; set; }

        /// <summary>
        /// Признак необходимости подтверждения начальника УКА ДРЧК
        /// </summary>
        public bool isNeedHRSubChief { get; set; }

        /// <summary>
        /// Признак необходимости ознакомления сотрудника
        /// </summary>
        public bool isNeedEmployeeReview { get; set; }

        /// <summary>
        /// Признак кандидата, пока тест, надо подумать!!!
        /// </summary>
        public bool isCandidate { get; set; }
    }

    public class Attachment
    {
        public string link { get; set; }
        public string name { get; set; }
        public bool sign { get; set; }
    }

    public class Reject
    {
        public Guid docId { get; set; }
        public string comment { get; set; }
        public string statusDesc { get; set; }

        public int tabNumber { get; set; }
    }

    public class HRDocumentSearchParam
    {
        public Guid? docId { get; set; }
        public ushort page { get; set; }
        public byte status { get; set; }
        public string? fromDate { get; set; }
        public string? toDate { get; set; }
        public int empTab { get; set; }

        public int employeeTabNumber { get; set; }
        public string? role { get; set; }
    }

    public class ConfirmDocument
    {
        public string id { get; set; }
        public int executorTabNum { get; set; }
    }

    public class DocumentFile
    {
        public Guid id { get; set; }
        public string link { get; set; }
        public string name { get; set; }
        public Guid parentId { get; set; }
        public DateTime createTime { get; set; }
    }

    public class DocumentFiles
    {
        public List<DocumentFile> files { get; set; }
    }

    public class Event
    {
        public Guid docId { get; set; }
        public int employeeTabNum { get; set; }
        public string employeeFullName { get; set; }
        public string eventName { get; set; }
        public string comment { get; set; }
        public DateTime createTime { get; set; }
    }

    public class Events
    {
        public List<Event> events { get; set; }
    }

    public class Pagination<T>
    {
        public List<T> Content { get; set; }
        public int TotalPages
        {
            get
            {
                return (int)Math.Ceiling((double)ItemCount / 10);
            }
        }
        public long ItemCount { get; set; }
        public int Page { get; set; }
        public bool First { get; set; }
        public bool Last { get; set; }

        public int LastPage
        {
            get
            {
                return (int)Math.Ceiling((decimal)ItemCount / 10);
            }
        }
    }
}
