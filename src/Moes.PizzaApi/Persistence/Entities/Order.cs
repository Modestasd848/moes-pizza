namespace Moes.PizzaApi.Persistence.Entities;

public class Order
{
    public int Id { get; set; }

    public required List<Pizza> Pizzas { get; set; }

    public decimal GetTotalPrice() => Pizzas.Sum(p => p.GetTotalPrice());

    public string GetFormattedTotalPrice() => GetTotalPrice().ToString("0.00");
}