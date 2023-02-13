using CentroMedico.Models.EF;

namespace CentroMedico.Models.VW
{
    public class PacientePostVM
    {
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public long NumeroDocumento { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int CiudadId { get; set; }
        public int TipoDocumentoId { get; set; }
    }
}
