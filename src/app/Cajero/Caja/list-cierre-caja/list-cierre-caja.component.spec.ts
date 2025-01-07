import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCierreCajaComponent } from './list-cierre-caja.component';

describe('ListCierreCajaComponent', () => {
  let component: ListCierreCajaComponent;
  let fixture: ComponentFixture<ListCierreCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCierreCajaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCierreCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
