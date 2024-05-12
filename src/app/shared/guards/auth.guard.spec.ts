import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { ToastrService } from 'ngx-toastr';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let toastr: ToastrService;

  beforeEach(() => {
    toastr = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard, { provide: ToastrService, useValue: toastr }],
    });

    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if user is logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue('test@example.com');
    const next = jasmine.createSpyObj('ActivatedRouteSnapshot', ['']);
    const state = jasmine.createSpyObj('RouterStateSnapshot', ['']);
    expect(guard.canActivate(next, state)).toBeTrue();
  });

  it('should prevent navigation and show a toast message if user is not logged in', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(router, 'navigate');
    const next = jasmine.createSpyObj('ActivatedRouteSnapshot', ['']);
    const state = jasmine.createSpyObj('RouterStateSnapshot', ['']);
    expect(guard.canActivate(next, state)).toBeFalse();
    expect(toastr.error).toHaveBeenCalledWith('You must login first');
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });
});
