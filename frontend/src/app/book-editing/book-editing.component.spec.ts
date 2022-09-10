import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditingComponent } from './book-editing.component';

describe('BookEditingComponent', () => {
  let component: BookEditingComponent;
  let fixture: ComponentFixture<BookEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookEditingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
