import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCobroAdminComponent } from './add-cobro-admin.component';

describe('AddCobroAdminComponent', () => {
  let component: AddCobroAdminComponent;
  let fixture: ComponentFixture<AddCobroAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCobroAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCobroAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
