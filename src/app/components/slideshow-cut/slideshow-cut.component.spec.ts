import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowCutComponent } from './slideshow-cut.component';

describe('SlideshowCutComponent', () => {
  let component: SlideshowCutComponent;
  let fixture: ComponentFixture<SlideshowCutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideshowCutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowCutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
