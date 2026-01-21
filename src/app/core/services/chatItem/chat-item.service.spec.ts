import { TestBed } from '@angular/core/testing';

import { ChatItemService } from './chat-item.service';

describe('ChatItemService', () => {
  let service: ChatItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
