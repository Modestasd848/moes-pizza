using Microsoft.EntityFrameworkCore;
using Moes.PizzaApi.Persistence.Entities;

namespace Moes.PizzaApi.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Order> Orders => Set<Order>();
    
    public DbSet<Pizza> Pizzas => Set<Pizza>();
    
    public DbSet<PizzaSpecial> PizzaSpecials => Set<PizzaSpecial>();
    
    public DbSet<Topping> Toppings => Set<Topping>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<PizzaTopping>().HasKey(pst => new { pst.PizzaId, pst.ToppingId });
        modelBuilder.Entity<PizzaTopping>().HasOne<Pizza>().WithMany(ps => ps.Toppings);
        modelBuilder.Entity<PizzaTopping>().HasOne(pst => pst.Topping).WithMany();
    }
}