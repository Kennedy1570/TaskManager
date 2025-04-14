 using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace TaskManager.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            Tasks = new HashSet<TaskItem>();
        }

        // Custom properties
        public string? FirstName  { get; set; }
        public string? LastName { get; set; }
        
        // Navigation property
        public virtual ICollection<TaskItem> Tasks { get; set; }
    }
}
