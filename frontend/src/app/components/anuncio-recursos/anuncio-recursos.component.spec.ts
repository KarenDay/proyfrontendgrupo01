import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioRecursosComponent } from './anuncio-recursos.component';

describe('AnuncioRecursosComponent', () => {
  let component: AnuncioRecursosComponent;
  let fixture: ComponentFixture<AnuncioRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioRecursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnuncioRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
