using CentroMedico.Models.DAL;
using CentroMedico.Models.EF;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CentroMedico.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CiudadController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public CiudadController(ApplicationDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ciudad>>> Get()
        {
            try
            {
                var li = _db.Ciudades
                    .OrderBy(I => I.Descripcion)
                    .Select(i => new
                    {
                        id = i.Id,
                        descripcion = i.Descripcion
                    }
                    )
                    .ToList();
                return Ok(new { success = true, result = li });
            }
            catch (Exception ex)
            {
                return Ok(new { success = false, result = "Error Consultando Datos" });
            }
        }
    }
}
