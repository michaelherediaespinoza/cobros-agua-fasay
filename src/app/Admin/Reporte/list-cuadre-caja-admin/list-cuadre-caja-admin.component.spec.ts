import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCuadreCajaAdminComponent } from './list-cuadre-caja-admin.component';

describe('ListCuadreCajaAdminComponent', () => {
  let component: ListCuadreCajaAdminComponent;
  let fixture: ComponentFixture<ListCuadreCajaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCuadreCajaAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCuadreCajaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
