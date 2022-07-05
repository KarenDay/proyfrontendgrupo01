import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioAreaComponent } from './anuncio-area.component';

describe('AnuncioAreaComponent', () => {
  let component: AnuncioAreaComponent;
  let fixture: ComponentFixture<AnuncioAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnuncioAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
