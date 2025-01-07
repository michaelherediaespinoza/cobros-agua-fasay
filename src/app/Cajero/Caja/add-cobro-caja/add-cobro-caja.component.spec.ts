import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCobroCajaComponent } from './add-cobro-caja.component';

describe('AddCobroCajaComponent', () => {
  let component: AddCobroCajaComponent;
  let fixture: ComponentFixture<AddCobroCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCobroCajaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCobroCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
