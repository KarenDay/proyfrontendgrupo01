import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { RolComponent } from './components/rol/rol.component';
import { AreaComponent } from './components/area/area/area.component';
import { AreaEncargadosComponent } from './components/area/area-encargados/area-encargados.component';
import { PersonaComponent } from './components/persona/persona.component';
import { PersonaFormUsuarioComponent } from './components/persona/persona-form-usuario/persona-form-usuario.component';
import { PersonaFormComponent } from './components/persona-form/persona-form.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { AnuncioAreaComponent } from './components/anuncio-area/anuncio-area.component';

@NgModule({
  declarations: [
    AppComponent,
    AnuncioComponent,
    RolComponent,
    AreaComponent,
    AreaEncargadosComponent,
    PersonaComponent,
    PersonaFormUsuarioComponent,
    PersonaFormComponent,
    EstadisticasComponent,
    AnuncioAreaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
