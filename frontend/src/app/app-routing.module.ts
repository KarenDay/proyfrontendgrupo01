import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { AreaEncargadosComponent } from './components/area/area-encargados/area-encargados.component';
import { AreaComponent } from './components/area/area/area.component';
import { PersonaFormComponent } from './components/persona-form/persona-form.component';
import { PersonaComponent } from './components/persona/persona.component';
import { RolComponent } from './components/rol/rol.component';

const routes: Routes = [
  {path:'rol',component:RolComponent},
  {path:'persona',component:PersonaComponent},
  {path:'persona-form/:id',component:PersonaFormComponent},
  {path:'area',component:AreaComponent},
  {path:'area-encargados/:id',component:AreaEncargadosComponent},
  {path:'anuncio',component:AnuncioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
