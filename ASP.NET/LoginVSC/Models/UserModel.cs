using System.ComponentModel.DataAnnotations;

namespace LoginVSC.Models;
public class User{
    [Key]
    [Required]
    public string Email { get; set; }
    
    [Required]
    public string Password { get; set; }

    [Required]
    public string FullName { get; set; }

    public int Age { get; set; }

    [Required]
    public string Token { get; set; }

    public string Address { get; set; }

}