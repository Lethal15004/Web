using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using LoginVSC.Models;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using Database;
namespace LoginVSC.Controllers;

public class HomeController : Controller
{
    private readonly AppDbContext _DBcontext;
    private readonly ILogger<HomeController> _logger;

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
    public HomeController(ILogger<HomeController> logger,AppDbContext DBcontext)
    {
        _DBcontext = DBcontext;
        _logger = logger;
    }

    public IActionResult Index()
    {
        string Name = checkUseMiddleWare();
        ViewBag.Name = Name;
        return View();
    }

    public IActionResult Privacy()
    {
        string Name = checkUseMiddleWare();
        ViewBag.Name = Name;
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
