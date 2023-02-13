import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CiudadGet } from 'src/app/models/ciudad.get.model';
import { TipoDocumentoGet } from 'src/app/models/tipodocumento.get.model';
import { CiudadService } from 'src/app/services/ciudad.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TipoDocumentoService } from 'src/app/services/tipodocumento.service';

@Component({
  selector: 'app-paciente-modificar',
  templateUrl: './paciente-modificar.component.html',
  styleUrls: ['./paciente-modificar.component.css']
})
export class PacienteModificarComponent {
  formularioModificar!: FormGroup;
  tipoDocumento!: TipoDocumentoGet[] | null;
  ciudad!: CiudadGet[] | null;
  tipoDocumentoIdControl: any;
  ciudadIdControl: any;

  constructor(private route: ActivatedRoute
    , private formBuilder: FormBuilder, private router: Router
    ,private tipoDocumentoService: TipoDocumentoService
    ,private ciudadService: CiudadService
    ,private pacienteService: PacienteService
    ) {

    this.formularioModificar = this.formBuilder.group({
      id: ['', Validators.required],
      nombres: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      apellidos: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      tipoDocumentoId: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required, Validators.min(new Date().getTime())]],
      ciudadId: ['', Validators.required]
    });


  }

  ngOnInit() {
    debugger
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pacienteService.getPacienteById(id)
        .subscribe(data => {
          if (data && data.result && data.success) {
            this.formularioModificar.setValue({
              id: data.result.id,
              nombres: data.result.nombres,
              apellidos: data.result.apellidos,
              numeroDocumento: data.result.numeroDocumento,
              tipoDocumentoId: data.result.tipoDocumentoId,
              fechaNacimiento: data.result.fechaNacimiento,
              ciudadId: data.result.ciudadId
            });
          } else {
            this.router.navigate(['error']);
          }

        }, error => {
          console.log(error);
        });
    } else {
      this.router.navigate(['error']);
    }
    this.tipoDocumentoService.getTipoDocumento().subscribe(tiposDocumento => {
      if (tiposDocumento && tiposDocumento.success) {
        this.tipoDocumento = tiposDocumento.result;
        this.tipoDocumentoIdControl = this.formularioModificar.get('tipoDocumentoId');
        this.tipoDocumentoIdControl.valueChanges.subscribe((value: any) => {
          console.log(value); // value is the selected id
        });
      }
    });

    this.ciudadService.getCiudad().subscribe(ciudad => {
      if (ciudad && ciudad.success) {
        this.ciudad = ciudad.result;
        this.ciudadIdControl = this.formularioModificar.get('ciudadId');
        this.ciudadIdControl.valueChanges.subscribe((value: any) => {
          console.log(value); // value is the selected id
        });
      }
    });
  }


  onSubmit() {
    const paciente = this.formularioModificar.value;
    paciente.tipoDocumentoId = this.tipoDocumentoIdControl.value;
    paciente.ciudadId = this.ciudadIdControl.value;
    this.pacienteService.updatePaciente(paciente)
      .subscribe(data => {
        if (data && data.success) {
          this.router.navigate(['paciente/list']);
        } else {
          this.router.navigate(['error']);
        }
      }, error => {
        console.log(error);
      });
  }

  goToList() {
    this.router.navigate(['paciente/list']);
  }
}

