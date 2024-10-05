using LoginVSC.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;

//Database
namespace Database{
    public class AppDbContext : DbContext{
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}
        
        //Lấy Bảng Users trong Database ra
        public DbSet<User> Users { get; set;}
    }
}