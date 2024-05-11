import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TasksService } from './tasks.service';
import { environment } from '../../../environments/environment';

describe('TasksService', () => {
  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService],
    });

    service = TestBed.inject(TasksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should make a GET request to the correct URL when getAllTask is called', () => {
    service.getAllTask().then(() => {});

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toBe('GET');
  });

  it('should make a GET request to the correct URL when getAllPendingTask is called', () => {
    service.getAllPendingTask().then(() => {});

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks/pending`);
    expect(req.request.method).toBe('GET');
  });

  it('should make a PATCH request to the correct URL when markTaskAsCompleted is called', () => {
    const taskId = '1';
    service.markTaskAsCompleted(taskId).then(() => {});

    const req = httpMock.expectOne(
      `${environment.apiUrl}/tasks/${taskId}/completed`
    );
    expect(req.request.method).toBe('PATCH');
  });

  it('should make a PUT request to the correct URL with correct body when editTask is called', () => {
    const taskId = '1';
    const title = 'New Title';
    const description = 'New Description';
    service.editTask(taskId, title, description).then(() => {});

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks/${taskId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ title, description });
  });

  it('should make a DELETE request to the correct URL when deleteTask is called', () => {
    const taskId = '1';
    service.deleteTask(taskId).then(() => {});

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks/${taskId}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should make a POST request to the correct URL with correct body when createTask is called', () => {
    const title = 'New Title';
    const description = 'New Description';
    service.createTask(title, description).then(() => {});

    const req = httpMock.expectOne(`${environment.apiUrl}/tasks`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title, description });
  });
});
