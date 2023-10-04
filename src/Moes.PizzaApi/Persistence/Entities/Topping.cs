namespace Moes.PizzaApi.Persistence.Entities;

public class Topping
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public decimal Price { get; set; }

    public string GetFormattedPrice() => Price.ToString("0.00");
}