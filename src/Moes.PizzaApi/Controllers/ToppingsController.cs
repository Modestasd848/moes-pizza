using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moes.PizzaApi.Persistence;

namespace Moes.PizzaApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ToppingsController : ControllerBase
{
    private readonly ApplicationDbContext _applicationDbContext;

    public ToppingsController(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _applicationDbContext.Toppings.ToListAsync());
    }
}