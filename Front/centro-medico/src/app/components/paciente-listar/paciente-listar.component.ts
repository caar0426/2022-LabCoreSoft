import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { PacienteGet } from 'src/app/models/paciente.get.model';
import { PacienteService } from 'src/app/services/paciente.service';
import {MatDialog} from '@angular/material/dialog'
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-paciente-listar',
  templateUrl: './paciente-listar.component.html',
  styleUrls: ['./paciente-listar.component.css']
})
export class PacienteListarComponent {
  displayedColumns: string[] = [
    'id',
    'nombres', 
    'apellidos',
    'numeroDocumento',
    'tipoDocumento',
    'fechaNacimiento',
    'ciudad',
    'actions'
  ];
  pacientes: MatTableDataSource<any[]> = new MatTableDataSource<any[]>([]);
  parametro: any;
  constructor(private pacienteService: PacienteService
    , private router: Router
    ,public dialog: MatDialog
    ,private changeDetectorRef: ChangeDetectorRef) { 

    }
    
  ngOnInit() {
    this.pacienteService.getPaciente().subscribe(data  => {
      if(data && data.success)
      {
        this.pacientes = new MatTableDataSource(data.result);
      }
    });
  }

  goToEdit(id: number) {
    debugger
    this.router.navigate(['paciente/edit', id]);
  }

  goToOpenModal(parametro: any)
  {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {message:"¿Desea Eliminar este registro?"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se ha cerrado');
      if (result) {
        this.deletePaciente(parametro);
      }
    });
  }

  deletePaciente(id: number) {
    
    this.pacienteService.deletePaciente(id).subscribe(data => {
      if(data && data.success)
      {

        this.ngOnInit();
      }
    }, error => {
      console.log(error);
    });
  }

  goToCreate() {
    this.router.navigate(['paciente/create']);
  }

  goToRefresh() {
    this.pacienteService.getPaciente().subscribe(data  => {
      if(data && data.success)
      {
        this.pacientes = data.result;
        this.changeDetectorRef.detectChanges();
      }
    });
  }
}
