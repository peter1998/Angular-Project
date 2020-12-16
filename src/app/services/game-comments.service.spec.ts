import { TestBed } from '@angular/core/testing';

import { GameCommentsService } from './game-comments.service';

describe('GameCommentsService', () => {
  let service: GameCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
