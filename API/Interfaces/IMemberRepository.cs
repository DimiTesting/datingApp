using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IMemberRepository
    {
        void Update(Member member);
        Task<bool> SaveAllChangesAsync();
        Task<IReadOnlyList<Member>> GetAllMemebersAsync();
        Task<Member?> GetMemberByIdAsync(string id);
        Task<IReadOnlyList<Photo>> GetMemeberPhotosAsync(string memberId);
        Task<Member?> GetMemberByIdToUpdate(string id);        
    }
}