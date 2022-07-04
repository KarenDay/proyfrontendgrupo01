import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioEncargadoComponent } from './anuncio-encargado.component';

describe('AnuncioEncargadoComponent', () => {
  let component: AnuncioEncargadoComponent;
  let fixture: ComponentFixture<AnuncioEncargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioEncargadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnuncioEncargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
