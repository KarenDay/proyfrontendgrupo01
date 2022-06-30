import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnuncioComponent } from './components/anuncio/anuncio.component';
import { RolComponent } from './components/rol/rol.component';
import { AnuncioVistaComponent } from './components/anuncio-vista/anuncio-vista.component';

@NgModule({
  declarations: [
    AppComponent,
    AnuncioComponent,
    RolComponent,
    AnuncioVistaComponent
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
