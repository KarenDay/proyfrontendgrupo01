import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { RolComponent } from './components/rol/rol.component';
import { AnuncioVistaComponent } from './components/anuncio-vista/anuncio-vista.component';
import { AreaComponent } from './components/area/area/area.component';
import { AreaEncargadosComponent } from './components/area/area-encargados/area-encargados.component';
import { PersonaComponent } from './components/persona/persona.component';
import { PersonaFormUsuarioComponent } from './components/persona/persona-form-usuario/persona-form-usuario.component';
import { PersonaFormComponent } from './components/persona-form/persona-form.component';

import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { AnuncioAreaComponent } from './components/anuncio-area/anuncio-area.component';

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { MisAnunciosComponent } from './components/mis-anuncios/mis-anuncios.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { QRCodeModule } from 'angularx-qrcode';
import { AnuncioEncargadoComponent } from './components/anuncio-encargado/anuncio-encargado.component';

@NgModule({
  declarations: [
    AppComponent,
    AnuncioComponent,
    RolComponent,
    AnuncioVistaComponent,
    AreaComponent,
    AreaEncargadosComponent,
    PersonaComponent,
    PersonaFormUsuarioComponent,
    PersonaFormComponent,

    EstadisticasComponent,
    AnuncioAreaComponent

    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MisAnunciosComponent,
    AnuncioEncargadoComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    QRCodeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
