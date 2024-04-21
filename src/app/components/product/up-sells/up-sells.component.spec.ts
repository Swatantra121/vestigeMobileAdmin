import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpSellsComponent } from './up-sells.component';

describe('UpSellsComponent', () => {
  let component: UpSellsComponent;
  let fixture: ComponentFixture<UpSellsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpSellsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpSellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
