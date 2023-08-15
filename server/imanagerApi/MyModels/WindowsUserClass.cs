using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GetWindowsUserName.Models
{
    public class WindowsUserClass
    {

        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly string _userName;
        public WindowsUserClass(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _userName = httpContextAccessor.HttpContext.User.Identity.Name;
        }

        public string GetUserName()
        {
            return _userName;
        }
    }
}