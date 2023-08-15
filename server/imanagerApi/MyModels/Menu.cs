namespace imanagerApi.MyModels
{
    public class Menu
    {
        public int Id { get; set; }
        public int ParentMenuId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public string Controller { get; set; }
        public string Method { get; set; }
        public string Icon { get; set; }
        public bool IsDropdownList { get; set; }

    }
}
