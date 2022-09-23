namespace API.RequestHelpers
{
    public class ContactParams: PaginationParams
    {
        public string OrderBy { get; set; }
        public string SearchTerm { get; set; }
    }
}