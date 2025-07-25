using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Extentions
{
    public static class AppUserExtention
    {
        public static UserDTO ToDto(this AppUser appUser, ITokenService tokenService)
        {
            return new UserDTO
            {
                Id = appUser.Id,
                DisplayName = appUser.DisplayName,
                Email = appUser.Email,
                Token = tokenService.CreateToken(appUser)
            };
        }
    }
}