using imanagerApi.HttpClients;
using imanagerApi.MyModels;
using Newtonsoft.Json;

namespace imanagerApi.Services.SignatureService
{
    public class SignatureService
    {
  
            private readonly Uri _signerConnnectionString;
            private readonly HttpConnector _httpConnector;
            private readonly Uri _signCabinetApi;

            public SignatureService(Uri signerConnnectionString, Uri signCabinetApi,
                                    HttpConnector httpConnector)

            {
                _httpConnector = httpConnector;
                _signerConnnectionString = signerConnnectionString;
                _signCabinetApi = signCabinetApi;
            }

            public async Task<SignHRResponse> SignHR(string request)
            {
                var response = await _httpConnector.PostAsyncWrap(request, new Uri(_signCabinetApi, "sign/hr/pkcs"));
                return JsonConvert.DeserializeObject<SignHRResponse>(response);

            }

            public async Task SignEmp(string request)
            {
                await _httpConnector.PostAsyncWrap(request, new Uri(_signCabinetApi, "sign/emp/pkcs"));
            }

            public async Task<string> FakeQR(string request)
            {
                return await _httpConnector.PostAsyncWrap(request, new Uri(_signCabinetApi, "qr/fake"));
            }

            public async Task<CertInfo> GetCertInfo(Signature signature)
            {
                var request = JsonConvert.SerializeObject(new { cert = signature.File, pass = signature.Password });
                string response = await _httpConnector.PostAsyncWrap(request, new Uri(_signerConnnectionString, @"cert/info/pkcs"));
                return JsonConvert.DeserializeObject<CertInfo>(response);
            }
        
    }
}
