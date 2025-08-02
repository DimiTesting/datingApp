using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MemberRepository(AppDbContext context) : IMemberRepository
    {
        public async Task<IReadOnlyList<Member>> GetAllMemebersAsync()
        {
            return await context.Members.ToListAsync();
        }

        public async Task<Member?> GetMemberByIdAsync(string id)
        {
            return await context.Members.FindAsync(id);
        }

        public async Task<IReadOnlyList<Photo>> GetMemeberPhotosAsync(string memberId)
        {
            return await context.Members
                .Where(member => member.Id == memberId)
                .SelectMany(photo => photo.Photos)
                .ToListAsync();
        }

        public async Task<bool> SaveAllChangesAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public void Update(Member member)
        {
            context.Entry(member).State = EntityState.Modified;
        }
    }
}