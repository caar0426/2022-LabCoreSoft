import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../components/error/error.component';
import { PacienteCrearComponent } from '../components/paciente-crear/paciente-crear.component';
import { PacienteListarComponent } from '../components/paciente-listar/paciente-listar.component';
import { PacienteModificarComponent } from '../components/paciente-modificar/paciente-modificar.component';

const routes: Routes = [
  { path: '', component: PacienteListarComponent},
  { path: 'paciente/create', component: PacienteCrearComponent},
  { path: 'paciente/list', component: PacienteListarComponent},
  { path: 'paciente/edit/:id', component: PacienteModificarComponent},
  { path: 'error', component: ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
