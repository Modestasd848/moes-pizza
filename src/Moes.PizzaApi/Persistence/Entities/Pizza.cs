using System.ComponentModel.DataAnnotations.Schema;

namespace Moes.PizzaApi.Persistence.Entities;

public class Pizza
{
    public int Id { get; set; }

    public int OrderId { get; set; }

    public required PizzaSpecial Special { get; set; }

    public int SpecialId { get; set; }

    [Column(TypeName = "nvarchar(6)")]
    public PizzaSize PizzaSize { get; set; } = PizzaSize.Medium;

    public required List<PizzaTopping> Toppings { get; set; }

    public decimal GetBasePrice()
    {
        return PizzaSize switch
        {
            PizzaSize.Small => 8 + Special.BasePrice,
            PizzaSize.Large => 12 + Special.BasePrice,
            _ => 10 + Special.BasePrice
        };
    }

    public decimal GetTotalPrice()
    {
        return GetBasePrice() + Toppings.Sum(t => t.Topping.Price);
    }

    public string GetFormattedTotalPrice()
    {
        return GetTotalPrice().ToString("0.00");
    }
}