using Microsoft.AspNetCore.Mvc;         // HttpPost
using System.Threading.Tasks;           // Task
using Domain;                           // AppUser
using Application.User;                 // Login

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }
    }
}