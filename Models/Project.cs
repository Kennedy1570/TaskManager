 using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models
{
    public class Project
    {
        public Project()
        {
            Tasks = new HashSet<TaskItem>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public DateTime? CompletedAt { get; set; }

        //Navigation property
        public virtual ICollection<TaskItem> Tasks { get; set; }
    }
}
