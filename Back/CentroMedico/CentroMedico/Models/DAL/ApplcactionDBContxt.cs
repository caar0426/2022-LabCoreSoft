using CentroMedico.Models.EF;
using Microsoft.EntityFrameworkCore;

namespace CentroMedico.Models.DAL
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<TipoDocumento> TipoDocumentos { get; set; }
        public DbSet<Ciudad> Ciudades { get; set; }
    }
}
