import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivbuttonComponent } from './archivbutton.component';

describe('ArchivbuttonComponent', () => {
  let component: ArchivbuttonComponent;
  let fixture: ComponentFixture<ArchivbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
