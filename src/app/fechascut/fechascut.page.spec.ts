import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FechascutPage } from './fechascut.page';

describe('FechascutPage', () => {
  let component: FechascutPage;
  let fixture: ComponentFixture<FechascutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechascutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FechascutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
