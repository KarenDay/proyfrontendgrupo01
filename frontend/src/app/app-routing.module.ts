import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { RolComponent } from './components/rol/rol.component';

const routes: Routes = [
  {path:'rol',component:RolComponent},
  {path:'anuncio',component:AnuncioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
