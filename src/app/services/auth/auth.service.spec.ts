import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should make a GET request to the correct URL when login is called', () => {
    const email = 'test@example.com';
    service.login(email).then(() => {});

    const req = httpMock.expectOne(`${environment.apiUrl}/users/${email}`);
    expect(req.request.method).toBe('GET');
  });

  it('should make a GET request to the correct URL when getAllUsers is called', () => {
    service.getAllUsers().then(() => {});

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('GET');
  });

  it('should make a POST request to the correct URL with correct body when registerUser is called', () => {
    const email = 'test@example.com';
    service.registerUser(email).then(() => {});

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email });
  });
});
