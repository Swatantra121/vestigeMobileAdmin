import { TestBed, inject } from '@angular/core/testing';

import { PusNotificationService } from './pus-notification.service';

describe('PusNotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PusNotificationService]
    });
  });

  it('should be created', inject([PusNotificationService], (service: PusNotificationService) => {
    expect(service).toBeTruthy();
  }));
});
