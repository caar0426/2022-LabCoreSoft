﻿namespace CentroMedico.Models.EF
{
    public class Paciente
    {
        public int Id { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public long NumeroDocumento { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int CiudadId { get; set; }
        public Ciudad Ciudad { get; set; }
        public int TipoDocumentoId { get; set; }
        public TipoDocumento TipoDocumento { get; set; }
        


    }
}
