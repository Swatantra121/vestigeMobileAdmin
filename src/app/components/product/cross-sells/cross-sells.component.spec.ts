import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossSellsComponent } from './cross-sells.component';

describe('CrossSellsComponent', () => {
  let component: CrossSellsComponent;
  let fixture: ComponentFixture<CrossSellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossSellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossSellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
