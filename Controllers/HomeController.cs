using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Security.Claims;
using TaskManager.Data;
using TaskManager.Models;

namespace TaskManager.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            if (User.Identity.IsAuthenticated)
            {
                var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                // Get upcoming tasks for dashboard
                var upcomingTasks = await _context.Tasks
                    .Where(t => t.UserId == currentUserId && t.Status != TaskItemStatus.Completed)
                    .OrderBy(t => t.DueDate)
                    .Take(5)
                    .ToListAsync();

                // Get projects summary
                var projects = await _context.Projects
                    .Select(p => new
                    {
                        Project = p,
                        TaskCount = p.Tasks.Count,
                        CompletedTaskCount = p.Tasks.Count(t => t.Status == TaskItemStatus.Completed)
                    })
                    .Take(5)
                    .ToListAsync();

                ViewData["UpcomingTasks"] = upcomingTasks;
                ViewData["Projects"] = projects;
            }

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}