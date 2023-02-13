import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CiudadGet } from 'src/app/models/ciudad.get.model';
import { TipoDocumentoGet } from 'src/app/models/tipodocumento.get.model';
import { CiudadService } from 'src/app/services/ciudad.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { TipoDocumentoService } from 'src/app/services/tipodocumento.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-paciente-crear',
  templateUrl: './paciente-crear.component.html',
  styleUrls: ['./paciente-crear.component.css']
})
export class PacienteCrearComponent {
  formularioCrear!: FormGroup;
  ciudad!: CiudadGet[] | null;
  ciudadIdControl: any;
  tipoDocumento!: TipoDocumentoGet[] | null;
  tipoDocumentoIdControl: any;

  constructor(private formBuilder: FormBuilder, private router: Router, 
    private tipoDocumentoService: TipoDocumentoService, 
    private ciudadService: CiudadService,
    private pacienteService: PacienteService,
    ) { 

    this.formularioCrear = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      tipoDocumentoId: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required,Validators.min(new Date().getTime())]],
      ciudadId: ['', Validators.required],
    });
    

  }

  ngOnInit() {
    this.ciudadService.getCiudad().subscribe(ciudad =>
      {
        if(ciudad && ciudad.success)
        {
          this.ciudad = ciudad.result;
          this.ciudadIdControl = this.formularioCrear.get('ciudadId');
          this.ciudadIdControl.valueChanges.subscribe((value: any) => {
            console.log(value); // value is the selected id
          });
        }
      });

      this.tipoDocumentoService.getTipoDocumento().subscribe(tipoDocumento =>
        {
          if(tipoDocumento && tipoDocumento.success)
          {
            this.tipoDocumento = tipoDocumento.result;
            this.tipoDocumentoIdControl = this.formularioCrear.get('tipoDocumentoId');
            this.tipoDocumentoIdControl.valueChanges.subscribe((value: any) => {
              console.log(value); // value is the selected id
            });
          }
        });
      
  }

 onSubmit() {
  debugger
    const paciente = this.formularioCrear.value;
    paciente.ciudadId = this.ciudadIdControl.value;
    paciente.tipoDocumentoId = this.tipoDocumentoIdControl.value;
    this.pacienteService.createPaciente(paciente)
      .subscribe(data => {
        
        if(data && data.success)
        {
          this.router.navigate(['paciente/list']);
        }else{
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
