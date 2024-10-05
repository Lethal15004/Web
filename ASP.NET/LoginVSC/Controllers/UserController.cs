using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using LoginVSC.Models;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using Database;
using Microsoft.EntityFrameworkCore;

namespace LoginVSC.Controllers;
public class UserController : Controller{
    private readonly AppDbContext _DBcontext;
    private readonly ILogger _logger;
    public String checkUseMiddleWare(){
        var user = HttpContext.Items["user"] as User;
        if (user != null)
        {
            string [] fullName=user.FullName.Trim().Split(" ");
            Array.Reverse(fullName);
            return fullName[0];
        }
        return null;
    }

    public UserController(ILogger<UserController> logger,AppDbContext DBcontext){
        _DBcontext = DBcontext;
        _logger = logger;
    }

    public IActionResult Login(){
        string Name = checkUseMiddleWare();
        ViewBag.Name = Name;
        if(Name!=null){
            return RedirectToAction("Index","Home");
        }else{
            return View();
        }
    }
    
    [HttpPost]
    public async Task<IActionResult> Login(User user) {
        var existUser = await _DBcontext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
        if(existUser==null){
            return View("Login");
        }else{
            if(user.Password!= existUser.Password){
                return View("Login");
            }else{
                HttpContext.Response.Cookies.Append("UserToken",existUser.Token,new CookieOptions() {
                    Expires = DateTime.Now.AddDays(1),
                    HttpOnly = true,
                    Secure=true,
                });
                TempData["user"] = JsonConvert.SerializeObject(existUser);
                return LocalRedirect("/Home/Index");
            }
            
        }
    }   
    public IActionResult Logout(){
        HttpContext.Response.Cookies.Delete("UserToken");
        return RedirectToAction("Index","Home");
    }
    public IActionResult Register(string username, string password){
        _logger.LogInformation($"Register for user {username} with password {password}");
        return Content("Register");
    }
    public IActionResult Profile(string id){
        _logger.LogInformation($"Register for id {id}");
        return Content("Profile");
    }
}