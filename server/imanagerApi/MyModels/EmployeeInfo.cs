using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace imanagerApi.MyModels
{
    public class EmployeeInfo
    {
        public string EmployeeTabNumber { get; set; }
        public string EmployeeLogin { get; set; }
        public string EmployeeFullName { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeePositionCode { get; set; }
        public string EmployeePositionName { get; set; }
        public int EmployeePositionLevel { get; set; }
        public string EmployeePhoneNumber { get; set; }
        public string EmployeeMobileNumber { get; set; }
        public string EmployeeEmail { get; set; }
        public string EmployeeBranchCode { get; set; }
        public string EmployeeBranchName { get; set; }
        public string EmployeeBlockCode { get; set; }
        public string EmployeeBlockName { get; set; }
        public string EmployeeDepartmentCode { get; set; }
        public string EmployeeDepartmentName { get; set; }
        public string EmployeeOfficeCode { get; set; }
        public string EmployeeOfficeName { get; set; }
        public string EmployeeDivisionCode { get; set; }
        public string EmployeeDivisionName { get; set; }
        public string EmployeeWorkAdditionalDescription { get; set; }
        public string EmployeeRecruitmentDateString { get; set; }
        public DateTime EmployeeRecruitmentDate { get; set; }
        public string EmployeeCurrentPositionTransferDateString { get; set; }
        public DateTime EmployeeCurrentPositionTransferDate { get; set; }
        public string EmployeeLaborLeave { get; set; }
        public string EmployeeEcologicalLeave { get; set; }
        public string EmployeePhotoUrl { get; set; }
        public DateTime SubstituteEndDate { get; set; }
        public string EmployeeIIN { get; set; }
        public string RandomCode { get; set; }

        public List<string> EmployeeRole { get; set; }
        public List<EmployeeChildrenInfo> EmployeeChildrenInfo { get; set; }
    };
    public class Executor
    {
        public string UserCode { get; set; }
        public string UserName { get; set; }
        public string Num { get; set; }
    }
}
