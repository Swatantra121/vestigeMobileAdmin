import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VbdWalletComponent } from './vbd-wallet.component';

describe('VbdWalletComponent', () => {
  let component: VbdWalletComponent;
  let fixture: ComponentFixture<VbdWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VbdWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VbdWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
