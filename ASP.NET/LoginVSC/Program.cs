//Tạo một đối tượng builder cho ứng dụng web, cho phép cấu hình các dịch vụ và middleware của ứng dụng.
using Database;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. 
// Bổ sung các dịch vụ vao trong builder
builder.Services.AddControllersWithViews(); // Add services for controllers and views.
builder.Services.AddRazorPages();// Add services for razor pages
builder.Services.AddCors(); // Add services for Cors.
builder.Services.AddSession(); // Add services for session.

// Configure database connection
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));


// Build the web host and start listening for HTTP requests.
var app = builder.Build();



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//Tự động chuyển hướng các yêu cầu HTTP sang HTTPS để đảm bảo bảo mật.
app.UseHttpsRedirection();

//Cho phép sử dụng file tĩnh (giống Nodejs)
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication(); //Xác định danh tính
app.UseAuthorization(); //Xác định quyền truy cập

// Đăng ký middleware cho toàn bộ routes
app.UseMiddleware<CheckAuthMiddleware>();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

    
app.MapRazorPages();// Ch

app.Run();
