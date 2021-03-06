using System.Collections.Generic;           // List
using System.Threading.Tasks;               // Task
using Application.Profiles;                 // Profile
using MediatR;
using Microsoft.AspNetCore.Mvc;             // HttpGet

namespace API.Controllers
{
    public class ProfilesController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> Get(string username)
        {
            return await Mediator.Send(new Details.Query { Username = username });
        }

        [HttpPut]
        public async Task<ActionResult<Unit>> Edit(Edit.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("{username}/visits")]
        public async Task<ActionResult<List<UserVisitDto>>> GetUserVisits(string username, string predicate)
        {
            return await Mediator.Send(new ListVisits.Query { Username = username, Predicate = predicate });
        }
    }
}