using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers
{
    [ApiController]
    public class TaskController : ControllerBase
    {
        private ApplicationDbContext _context;
        public TaskController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("task/{date}")]
        public IEnumerable<MyTask> Get(string date)
        {
            var tasks = _context.Tasks
                .Where(mt => mt.Date == date)
                .ToList();
            return tasks;
        }

        [Route("task/add")]
        [HttpPost]
        public void Post([FromBody] MyTask task)
        {
            _context.Tasks.Add(task);
            _context.SaveChanges();
        }

        [Route("task/delete/{id}")]
        [HttpDelete]
        public void Delete(int id)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
            _context.Tasks.Remove(task);
            _context.SaveChanges();
        }
    }
}
