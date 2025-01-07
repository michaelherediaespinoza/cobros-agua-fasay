import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsuarioAdminComponent } from './list-usuario-admin.component';

describe('ListUsuarioAdminComponent', () => {
  let component: ListUsuarioAdminComponent;
  let fixture: ComponentFixture<ListUsuarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUsuarioAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListUsuarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
