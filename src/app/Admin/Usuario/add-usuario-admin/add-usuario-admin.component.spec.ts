import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsuarioAdminComponent } from './add-usuario-admin.component';

describe('AddUsuarioAdminComponent', () => {
  let component: AddUsuarioAdminComponent;
  let fixture: ComponentFixture<AddUsuarioAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUsuarioAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUsuarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
