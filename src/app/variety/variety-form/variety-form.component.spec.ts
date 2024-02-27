import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietyFormComponent } from './variety-form.component';

describe('VarietyFormComponent', () => {
  let component: VarietyFormComponent;
  let fixture: ComponentFixture<VarietyFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VarietyFormComponent]
    });
    fixture = TestBed.createComponent(VarietyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
