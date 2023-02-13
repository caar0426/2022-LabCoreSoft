using CentroMedico.Models.DAL;
using CentroMedico.Models.EF;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CentroMedico.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoDocumentoController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public TipoDocumentoController(ApplicationDbContext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoDocumento>>> Get()
        {
            try
            {
                var li = _db.TipoDocumentos
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
