namespace Moes.PizzaApi.Persistence.Entities;

public class PizzaTopping
{
    public required Topping Topping { get; set; }
    
    public int ToppingId { get; set; }

    public int PizzaId { get; set; }
}