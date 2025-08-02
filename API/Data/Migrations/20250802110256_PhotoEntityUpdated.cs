using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class PhotoEntityUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastActivity",
                table: "Members",
                newName: "LastActive");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Members",
                newName: "Created");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastActive",
                table: "Members",
                newName: "LastActivity");

            migrationBuilder.RenameColumn(
                name: "Created",
                table: "Members",
                newName: "CreatedAt");
        }
    }
}
