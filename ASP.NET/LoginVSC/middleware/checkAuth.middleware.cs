using Database; // Thêm không gian tên cho AppDbContext
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection; // Thêm không gian tên này để sử dụng CreateScope()
using System.Text.Json.Serialization;
public class CheckAuthMiddleware
{
    private readonly RequestDelegate _next;

    public CheckAuthMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        using (var scope = context.RequestServices.CreateScope()) 
        {
            var _context = scope.ServiceProvider.GetRequiredService<AppDbContext>(); 

            if (context.Request.Cookies.TryGetValue("UserToken", out string token))
            {

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Token == token); 
                if (user != null)
                {
                    context.Items["user"] = user;
                }
            }
            await _next(context);
        }
    }
}