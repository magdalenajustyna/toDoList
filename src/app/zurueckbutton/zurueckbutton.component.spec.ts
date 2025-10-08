import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZurueckbuttonComponent } from './zurueckbutton.component';

describe('ZurueckbuttonComponent', () => {
  let component: ZurueckbuttonComponent;
  let fixture: ComponentFixture<ZurueckbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZurueckbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZurueckbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
