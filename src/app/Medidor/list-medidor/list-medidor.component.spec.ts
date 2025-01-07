import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedidorComponent } from './list-medidor.component';

describe('ListMedidorComponent', () => {
  let component: ListMedidorComponent;
  let fixture: ComponentFixture<ListMedidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMedidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMedidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
