import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorInterceptor } from './error.interceptor';
import { of } from 'rxjs';

describe('ErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let toastrService: ToastrService;

  beforeEach(() => {
    toastrService = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ToastrService, useValue: toastrService },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests.
  });

  it('should show an error toast when a request fails', () => {
    httpClient.get('/api').subscribe(
      () => fail('should have failed with a 500 error'),
      (error: HttpErrorResponse) => {
        expect(toastrService.error).toHaveBeenCalled();
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne('/api');

    // Respond with a mock error
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});
