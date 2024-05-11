import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { AuthComponent } from './auth.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewUserDialogComponent } from '../../shared/components/new-user-dialog/new-user-dialog.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;
  let router: Router;
  let dialog: MatDialog;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    const dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of({ email: 'test@example.com', confirm: true }),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule,
        MatCardModule,
        MatInputModule,
        MatProgressSpinnerModule,
      ],
      declarations: [AuthComponent],
      providers: [
        AuthService,
        { provide: MatDialog, useValue: dialogMock }, // Override MatDialog here
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty email', () => {
    expect(component.loginForm.value).toEqual({ email: '' });
  });

  it('should call AuthService.login when onSubmit is called with valid form', async () => {
    spyOn(authService, 'login').and.returnValue(
      Promise.resolve({ data: null, message: 'User logged in successfully' })
    );
    spyOn(router, 'navigate');
    component.loginForm.setValue({ email: 'test@example.com' });
    await component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith('test@example.com');
    expect(router.navigate).toHaveBeenCalledWith(['/client/dashboard']);
  });

  it('should call AuthService.registerUser when registerUser is called', async () => {
    spyOn(authService, 'registerUser').and.returnValue(Promise.resolve({}));
    spyOn(snackBar, 'open');
    spyOn(router, 'navigate');
    await component.registerUser('test@example.com');
    expect(authService.registerUser).toHaveBeenCalledWith('test@example.com');
    expect(snackBar.open).toHaveBeenCalledWith(
      'User registered successfully',
      'Close',
      { duration: 3000 }
    );
    expect(router.navigate).toHaveBeenCalledWith(['/client/dashboard']);
  });

  it('should open NewUserDialogComponent and call registerUser when dialog is closed with result', () => {
    spyOn(component, 'registerUser');
    const email = 'test@example.com';
    component.openRegisteDialog(email);
    expect(dialog.open).toHaveBeenCalledWith(NewUserDialogComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { email },
      width: '80%',
      height: 'auto',
    });
    expect(component.registerUser).toHaveBeenCalledWith(email);
  });

  it('should open NewUserDialogComponent when onSubmit is called and login fails with User not found error', () => {
    const email = 'test@example.com';
    spyOn(authService, 'login').and.returnValue(
      Promise.reject({
        status: 404,
        error: { message: 'User not found' },
      })
    );
    spyOn(component, 'openRegisteDialog');
    component.loginForm.setValue({ email });
    component.onSubmit();
    fixture.whenStable().then(() => {
      expect(component.openRegisteDialog).toHaveBeenCalledWith(email);
    });
  });
});
