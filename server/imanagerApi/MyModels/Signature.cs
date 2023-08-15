namespace imanagerApi.MyModels
{
    public class SignListDocumentData
    {
        public List<Document> Documents { get; set; }
        public Signature Signature { get; set; }
        public Signer signer { get; set; }
    }
 
    public class SignDocumentData
    {
        public Signature Signature { get; set; }
        public Document Document { get; set; }
        public Signer signer { get; set; }
    }
    public class Signer
    {
        public string fullName { get; set; }
        public string iin { get; set; }
        public string position { get; set; }
        public string dep { get; set; }
        public string tabNumber { get; set; }
    }
    public class Signature
    {
        public string Password { get; set; }
        public string File { get; set; }
    }
    public class SignHRResponse
    {
        public int errorCount { get; set; }
        public int signCount { get; set; }
    }
    public class CertInfo
    {
        public Issuer issuer { get; set; }
        public Subject subject { get; set; }
    }
    public class Issuer
    {
        public string country { get; set; }
        public string commonName { get; set; }
    }

    public class Subject
    {
        public string commonName { get; set; }
        public string givenName { get; set; }
        public string surname { get; set; }
        public string serialNumber { get; set; }
        public string notBefore { get; set; }
        public string notAfter { get; set; }
        public string keyUsage { get; set; }
        public string extendedKeyUsage { get; set; }
        public string authorityKeyIdentifier { get; set; }
        public string keyIdentifier { get; set; }
        public string certificateSerialNumber { get; set; }
        public string signtureAlghoritm { get; set; }
    }
    public class SignDocumentsRequest
    {
        public List<DocID> docs;
        public Signer signer { get; set; }
        public CertData signature { get; set; }
    }

    public class DocID
    {
        public Guid id { get; set; }
    }

    public class SignDocumentRequest
    {
        public DocID doc { get; set; }
        public Signer signer { get; set; }
        public CertData signature { get; set; }
    }

    public class CertData
    {
        public string cert { get; set; }
        public string pass { get; set; }
    }
}
