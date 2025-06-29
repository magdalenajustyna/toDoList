import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatenewtodoComponent } from './createnewtodo.component';

describe('CreatenewtodoComponent', () => {
  let component: CreatenewtodoComponent;
  let fixture: ComponentFixture<CreatenewtodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatenewtodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatenewtodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
