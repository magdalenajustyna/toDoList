import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArchivComponent } from './list-archiv.component';

describe('ListArchivComponent', () => {
  let component: ListArchivComponent;
  let fixture: ComponentFixture<ListArchivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListArchivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListArchivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
