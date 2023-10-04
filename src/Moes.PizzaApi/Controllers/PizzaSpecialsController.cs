using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moes.PizzaApi.Persistence;

namespace Moes.PizzaApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PizzaSpecialsController : ControllerBase
{
    private readonly ApplicationDbContext _applicationDbContext;

    public PizzaSpecialsController(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var pizzaSpecials = await _applicationDbContext.PizzaSpecials.ToListAsync();
        return Ok(pizzaSpecials);
    }
}