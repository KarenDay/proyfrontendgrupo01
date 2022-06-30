import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEncargadosComponent } from './area-encargados.component';

describe('AreaEncargadosComponent', () => {
  let component: AreaEncargadosComponent;
  let fixture: ComponentFixture<AreaEncargadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaEncargadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaEncargadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
