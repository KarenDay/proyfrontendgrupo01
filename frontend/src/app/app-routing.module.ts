import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnuncioAreaComponent } from './components/anuncio-area/anuncio-area.component';
import { AnuncioEncargadoComponent } from './components/anuncio-encargado/anuncio-encargado.component';
import { AnuncioRecursosComponent } from './components/anuncio-recursos/anuncio-recursos.component';
import { AnuncioVistaComponent } from './components/anuncio-vista/anuncio-vista.component';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { AreaEncargadosComponent } from './components/area/area-encargados/area-encargados.component';
import { AreaComponent } from './components/area/area/area.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { LoginComponent } from './components/login/login.component';
import { MedioComponent } from './components/medio/medio.component';
import { MisAnunciosComponent } from './components/mis-anuncios/mis-anuncios.component';
import { PersonaFormComponent } from './components/persona-form/persona-form.component';
import { PersonaComponent } from './components/persona/persona.component';
import { RolComponent } from './components/rol/rol.component';

const routes: Routes = [
  {path:'rol',component:RolComponent},
  {path:'persona',component:PersonaComponent},
  {path:'persona-form/:id',component:PersonaFormComponent},
  {path:'area',component:AreaComponent},
  {path:'area-encargados/:id',component:AreaEncargadosComponent},
  {path:'anuncio-form/:id',component:AnuncioComponent},
  {path:'index',component:AnuncioVistaComponent},
  {path:'mis-anuncios',component:MisAnunciosComponent},
  {path:'anuncios-a-autorizar',component:AnuncioEncargadoComponent},
  {path:'anuncios-area',component:AnuncioAreaComponent},
  {path:'anuncio-recursos/:id',component:AnuncioRecursosComponent},
  {path:'estadisticas',component:EstadisticasComponent},
  {path:'medios',component:MedioComponent},
  {path:'login',component:LoginComponent},
  {path:'**',pathMatch:'full',redirectTo:'index'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
