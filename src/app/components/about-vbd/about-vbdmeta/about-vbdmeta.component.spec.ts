import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutVBDmetaComponent } from './about-vbdmeta.component';

describe('AboutVBDmetaComponent', () => {
  let component: AboutVBDmetaComponent;
  let fixture: ComponentFixture<AboutVBDmetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutVBDmetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutVBDmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
