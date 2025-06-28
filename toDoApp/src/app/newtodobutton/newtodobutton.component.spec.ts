import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtodobuttonComponent } from './newtodobutton.component';

describe('NewtodobuttonComponent', () => {
  let component: NewtodobuttonComponent;
  let fixture: ComponentFixture<NewtodobuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewtodobuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewtodobuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
