using CentroMedico.Models.DAL;
using CentroMedico.Models.EF;
using CentroMedico.Models.VW;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CentroMedico.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PacienteController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public PacienteController(ApplicationDbContext db)
        {
            _db = db;
        }

        // GET: api/<PacienteController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Paciente>>> Get()
        {
            try
            {
                var li = _db.Pacientes
                    .Include(i => i.Ciudad)
                    .Include(i => i.TipoDocumento)
                    .OrderBy(I => I.Apellidos)
                    .ThenBy(i => i.Nombres)
                    .Select( i => new
                    {
                        id = i.Id,
                        nombres = i.Nombres,
                        apellidos = i.Apellidos,
                        numeroDocumento = i.NumeroDocumento,
                        tipoDocumento = i.TipoDocumento.Descripcion,
                        fechaNacimiento = i.FechaNacimiento.ToShortDateString(),
                        ciudad = i.Ciudad.Descripcion
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

        

        [HttpGet("{id}")]
        public async Task<ActionResult<Paciente>> GetPaciente(int id)
        {
            var tran = _db.Database.BeginTransaction();
            try
            {
                var paciente = await _db.Pacientes
                    .Where(i => i.Id == id)
                    .Select(i => new
                    {
                        id = i.Id,
                        nombres = i.Nombres,
                        apellidos = i.Apellidos,
                        numeroDocumento = i.NumeroDocumento,
                        tipoDocumentoId = i.TipoDocumentoId,
                        fechaNacimiento = i.FechaNacimiento,
                        ciudadId = i.CiudadId
                    })
                    .FirstOrDefaultAsync();

                if (paciente == null)
                {
                    return NotFound(new { success = false });
                }
                tran.Commit();
                return Ok(new { success = true, result = paciente });
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return BadRequest(new { success = false });
            }
        }


        [HttpPost]
        public async Task<ActionResult<Paciente>> PostPaciente(PacientePostVM paciente)
        {
            var tran = _db.Database.BeginTransaction();
            try
            {
                var model = new Paciente
                {
                    Nombres = paciente.Nombres,
                    Apellidos = paciente.Apellidos,
                    FechaNacimiento = paciente.FechaNacimiento,
                    CiudadId = paciente.CiudadId,
                    TipoDocumentoId = paciente.TipoDocumentoId,
                    NumeroDocumento = paciente.NumeroDocumento
                };
                _db.Pacientes.Add(model);
                await _db.SaveChangesAsync();
                tran.Commit();
                return Ok(new { success = true, result = model });
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return BadRequest(new { success = false });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaciente(int id, PacientePutVM paciente)
        {
            var tran = _db.Database.BeginTransaction();
            try
            {
                var model = _db.Pacientes.Find(id);
                if (id != model.Id)
                {
                    tran.Rollback();
                    return BadRequest(new { success = false });
                }

                if (!PacienteExists(id))
                {
                    tran.Rollback();
                    return NotFound(new { success = false });
                }


                model.TipoDocumentoId = paciente.TipoDocumentoId;
                model.CiudadId = paciente.CiudadId;
                model.Nombres = paciente.Nombres;
                model.Apellidos = paciente.Apellidos;
                model.FechaNacimiento = paciente.FechaNacimiento;

                _db.Entry(model).State = EntityState.Modified;

                await _db.SaveChangesAsync();
                tran.Commit();
                return Ok(new { success = true, result = model });
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return BadRequest(new { success = false });
            }
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<Paciente>> DeletePaciente(int id)
        {
            var tran = _db.Database.BeginTransaction();
            try
            {
                var paciente = await _db.Pacientes
                    .Where(i => i.Id == id)
                    .FirstOrDefaultAsync();
                if (paciente == null)
                {
                    tran.Rollback();
                    return NotFound(new { success = false });
                }

                var model = paciente;

                _db.Pacientes.Remove(paciente);
                await _db.SaveChangesAsync();
                tran.Commit();
                return Ok(new { success = true, result = model });
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return BadRequest(new { success = false });
            }
        }
        private bool PacienteExists(int id)
        {
            try
            {
                return _db.Pacientes.Any(e => e.Id == id);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
