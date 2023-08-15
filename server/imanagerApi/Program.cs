using imanagerApi.HttpClients;
using imanagerApi.Middleware;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();
builder.Services.AddHttpClient("startProcess").
                ConfigurePrimaryHttpMessageHandler(_ => new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicy) => { return true; }
                });
builder.Services.AddTransient<HttpConnector>();
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyMethod().AllowAnyOrigin().AllowAnyHeader();
    });
});

Console.WriteLine(builder.Environment.EnvironmentName);

builder.Configuration.AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json");
builder.Configuration.AddEnvironmentVariables();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.

app.UseSwagger();
app.UseSwaggerUI();


app.UseCors("CorsPolicy");

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();
