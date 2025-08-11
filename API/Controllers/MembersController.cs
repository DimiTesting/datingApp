using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Extentions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {
            return Ok(await memberRepository.GetAllMemebersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetMemberById(string id)
        {
            var member = await memberRepository.GetMemberByIdAsync(id);

            if (member == null) return NotFound();

            return member;
        }

        [HttpGet("{id}/photos")]
        public async Task<ActionResult<Member>> GetMemberPhotos(string id)
        {
            return Ok(await memberRepository.GetMemeberPhotosAsync(id));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateMemberDetails(MemberUpdateDTO memberUpdateDTO)
        {
            var memberId = User.GetMemberId();

            var member = await memberRepository.GetMemberByIdToUpdate(memberId);

            if (member == null) return BadRequest("Memeber is not found");

            member.DisplayName = memberUpdateDTO.DisplayName ?? member.DisplayName;
            member.Description = memberUpdateDTO.Description ?? member.Description;
            member.Country = memberUpdateDTO.Country ?? member.Country;
            member.City = memberUpdateDTO.City ?? member.City;

            member.AppUser.DisplayName = memberUpdateDTO.DisplayName ?? member.AppUser.DisplayName;

            memberRepository.Update(member);

            await memberRepository.SaveAllChangesAsync();

            return Accepted();
        }
    }
}