using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;
using System.Net.Security;

namespace imanagerApi.HttpClients
{
    public class HttpConnector
    {
        private readonly HttpClient _httpClient;

        public HttpConnector(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("startProcess");

        }

        public async Task<string> PostAsync(string request, Uri uri)
        {
            using HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, uri);
            httpRequestMessage.Content = new StringContent(request);
            httpRequestMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(@"application/json");
            var response = await _httpClient.SendAsync(httpRequestMessage);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Ошибка запроса {uri}, код ошибки {response.StatusCode}");
            }

            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> PostAsync(byte[] bytes, Uri uri)
        {
            using var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, uri);

            httpRequestMessage.Content = new ByteArrayContent(bytes);
            httpRequestMessage.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/octet-stream");
            var response = await _httpClient.SendAsync(httpRequestMessage);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Ошибка запроса {uri}, код ошибки {response.StatusCode}");
            }
            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> GetAsync(Uri uri)
        {
            using HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Get, uri);
            var response = await _httpClient.SendAsync(httpRequestMessage);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Ошибка запроса {uri}, код ошибки {response.StatusCode}");
            }

            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> PutAsync(string request, Uri uri)
        {
            using HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Put, uri);
            httpRequestMessage.Content = new StringContent(request);
            httpRequestMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(@"application/json");

            var response = await _httpClient.SendAsync(httpRequestMessage);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Ошибка запроса {uri}, код ошибки {response.StatusCode}");
            }

            return await response.Content.ReadAsStringAsync();
        }

        public async Task<string> PostAsyncWrap(string request, Uri uri)
        {
            using HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, uri);
            httpRequestMessage.Content = new StringContent(request);
            httpRequestMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(@"application/json");
            var response = await _httpClient.SendAsync(httpRequestMessage);
            var result = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                var ex = JsonConvert.DeserializeAnonymousType(result, new { resultMessage = "" });
                throw new Exception($"{ex.resultMessage}");
            }

            return result;
        }

        public async Task<string> PutAsyncWrap(string request, Uri uri)
        {
            using HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Put, uri);
            httpRequestMessage.Content = new StringContent(request);
            httpRequestMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(@"application/json");
            var response = await _httpClient.SendAsync(httpRequestMessage);
            var result = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                var ex = JsonConvert.DeserializeAnonymousType(result, new { resultMessage = "" });
                throw new Exception($"{ex.resultMessage}");
            }

            return result;
        }

        public async Task PostAsyncNonResponsive(string request, Uri uri)
        {
            using HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, uri);
            httpRequestMessage.Content = new StringContent(request);
            httpRequestMessage.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(@"application/json");
            
            _httpClient.SendAsync(httpRequestMessage).ConfigureAwait(false);            
        }

        public async Task<string> PostFormDataAsyncWrap(byte[] bytes, string fileName, Uri uri, string keyName)
        {
            using var content = new MultipartFormDataContent();

            var byteContent = new ByteArrayContent(bytes);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            content.Add(byteContent, name: keyName, fileName: fileName);

            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
            ServicePointManager.ServerCertificateValidationCallback = new RemoteCertificateValidationCallback
            (
               delegate { return true; }
            );

            var response = await _httpClient.PostAsync(uri, content);

            var result = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                var ex = JsonConvert.DeserializeAnonymousType(result, new { resultMessage = "" });
                throw new Exception($"{ex.resultMessage}");
            }

            return result;
        }
    }
}
