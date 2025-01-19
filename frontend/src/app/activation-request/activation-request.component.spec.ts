import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationRequestComponent } from './activation-request.component';

describe('ActivationRequestComponent', () => {
  let component: ActivationRequestComponent;
  let fixture: ComponentFixture<ActivationRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationRequestComponent]
    });
    fixture = TestBed.createComponent(ActivationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
