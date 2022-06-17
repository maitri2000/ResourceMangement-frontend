import { TestBed } from '@angular/core/testing';

import { TaskInterceptorService } from './task-interceptor.service';

describe('TaskInterceptorService', () => {
  let service: TaskInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
