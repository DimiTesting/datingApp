using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public static class Seed
    {
        public static async Task SeedData(AppDbContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var memberData = await File.ReadAllTextAsync("Data/UserSeedData.json");
            var members = JsonSerializer.Deserialize<List<SeedUserDTO>>(memberData);

            if (members == null)
            {
                Console.WriteLine("No members in seed data");
                return;
            }



            foreach (var member in members)
            {
                using var hmac = new HMACSHA512();

                var user = new AppUser
                {
                    Id = member.Id,
                    Email = member.Email,
                    DisplayName = member.DisplayName,
                    ImageUrl = member.ImageUrl,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
                    PasswordSalt = hmac.Key,
                    Member = new Member
                    {
                        Id = member.Id,
                        DisplayName = member.DisplayName,
                        ImageUrl = member.ImageUrl,
                        Description = member.Description,
                        Gender = member.Gender,
                        City = member.City,
                        Country = member.Country,
                        DateOfBirth = member.DateOfBirth,
                        Created = member.CreatedAt,
                        LastActive = member.LastActive
                    }
                };

                user.Member.Photos.Add(new Photo
                {
                    Url = member.ImageUrl!,
                    MemberId = member.Id,

                });

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();

            Console.WriteLine(context.Users);
        }
    }
}