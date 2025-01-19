import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueBooksComponent } from './due-books.component';

describe('DueBooksComponent', () => {
  let component: DueBooksComponent;
  let fixture: ComponentFixture<DueBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DueBooksComponent]
    });
    fixture = TestBed.createComponent(DueBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
