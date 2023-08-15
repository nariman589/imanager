namespace imanagerApi.MyModels
{
    public class Instructions
    {
        public int InstructionId { get; set; }
        public string InstructionName { get; set; }
        public string InstructionBranch { get; set; }
        public string InstructionUrl { get; set; }
        public string WhoAdded { get; set; }
        public string WhenAdded { get; set; }
        public string WhoChanged { get; set; }
        public string WhenChanged { get; set; }
        public bool IsActual { get; set; }
        public string BranchCode { get; set; }
        public string BranchName { get; set; }
        public string BlockCode { get; set; }
        public string BlockName { get; set; }
        public string DepCode { get; set; }
        public string DepName { get; set; }
        public string DepNames { get; set; }
        public string UnitCode { get; set; }
        public string UnitName { get; set; }
        public string ParentUnitCode { get; set; }
        public string ChangeDate { get; set; }
        public string UnitLevel { get; set; }
        public string ParentLevel { get; set; }
    }

    public class InstructionsCreate
    {
        public string InstructionName { get; set; }
        public string InstructionBranch { get; set; }
        public string InstructionUrl { get; set; }
        public string WhoAdded { get; set; }
        public string WhenAdded { get; set; }
        public string WhoChanged { get; set; }
        public string WhenChanged { get; set; }
        public bool IsActual { get; set; }
    }

    public class InstructionsUpdate
    {
        public int InstructionId { get; set; }
        public string InstructionName { get; set; }
        public string InstructionBranch { get; set; }
        public string InstructionUrl { get; set; }
        public string WhoChanged { get; set; }
        public string WhenChanged { get; set; }
    }

    public class InstructionId
    {
        public int Id { get; set; }
    }
}
