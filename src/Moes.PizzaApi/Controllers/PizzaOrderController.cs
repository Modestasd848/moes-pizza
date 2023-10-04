using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moes.PizzaApi.Persistence;
using Moes.PizzaApi.Persistence.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace Moes.PizzaApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PizzaOrderController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public PizzaOrderController(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var orders = await _applicationDbContext.Orders
                .Include(o => o.Pizzas)
                .ToListAsync();

            return Ok(orders);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Order order)
        {
            if (order == null)
            {
                return BadRequest("Invalid order data");
            }

            // Save the new order to the database
            _applicationDbContext.Orders.Add(order);
            await _applicationDbContext.SaveChangesAsync();

            return Ok(order);
        }
    }
}