import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCobroAdminComponent } from './list-cobro-admin.component';

describe('ListCobroAdminComponent', () => {
  let component: ListCobroAdminComponent;
  let fixture: ComponentFixture<ListCobroAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCobroAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCobroAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
