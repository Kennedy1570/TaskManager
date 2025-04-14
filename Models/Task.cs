using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public TaskPriority Priority { get; set; }

        [Required]
        public TaskItemStatus Status { get; set; }

        //Foreign keys
        public string UserId { get; set; }
        
        public int? ProjectId { get; set; }
        
        //Navigation properties
        [ForeignKey("UserId")]
        public ApplicationUser AssignedUser { get; set; }
        
        [ForeignKey("ProjectId")]
        public Project Project { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        public DateTime? CompletedAt { get; set; }
    }

    public enum TaskPriority
    {
        Low,
        Medium,
        High,
        Urgent
    }

    public enum TaskItemStatus
    {
        NotStarted,
        InProgress,
        OnHold,
        Completed,
        Cancelled
    }
} 
