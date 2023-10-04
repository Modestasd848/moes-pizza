using Microsoft.AspNetCore.Mvc;
using Moes.PizzaApi.Persistence.Entities;

namespace Moes.PizzaApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PizzaController : ControllerBase
{
    public record PizzaPriceRequest(
        PizzaSpecial Special,
        int SpecialId,
        string Size,
        List<Topping> Toppings);
    
    [HttpPost("price")]
    public IActionResult Price([FromBody] PizzaPriceRequest pizzaPriceRequest)
    {
        var pizza = new Pizza
        {
            Special = pizzaPriceRequest.Special,
            SpecialId = pizzaPriceRequest.SpecialId,
            PizzaSize = Enum.Parse<PizzaSize>(pizzaPriceRequest.Size),
            Toppings = pizzaPriceRequest.Toppings.Select(topping =>
                    new PizzaTopping
                    {
                        Topping = topping,
                        ToppingId = topping.Id,
                        PizzaId = 0
                    })
                .ToList()
        };
        
        return Ok(new { price = pizza.GetTotalPrice() });
    }
}