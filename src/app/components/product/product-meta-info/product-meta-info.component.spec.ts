import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMetaInfoComponent } from './product-meta-info.component';

describe('ProductMetaInfoComponent', () => {
  let component: ProductMetaInfoComponent;
  let fixture: ComponentFixture<ProductMetaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMetaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMetaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
