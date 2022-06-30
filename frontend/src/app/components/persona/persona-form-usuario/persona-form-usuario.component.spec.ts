import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaFormUsuarioComponent } from './persona-form-usuario.component';

describe('PersonaFormUsuarioComponent', () => {
  let component: PersonaFormUsuarioComponent;
  let fixture: ComponentFixture<PersonaFormUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaFormUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaFormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
