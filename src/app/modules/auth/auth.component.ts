import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewUserDialogComponent } from '../../shared/components/new-user-dialog/new-user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    const email = this.loginForm.value.email;
    if (this.loginForm.valid && email) {
      this.isLoading = true;
      this.authService
        .login(email)
        .then((response) => {
          this.isLoading = false;
          this.router.navigate(['/client/dashboard']);
        })
        .catch((error) => {
          this.isLoading = false;
          console.error(error);
          if (
            error.status === 404 &&
            error.error.message === 'User not found'
          ) {
            this.openRegisteDialog(email);
          }
        });
    }
  }

  registerUser(email: string): void {
    this.isLoading = true;
    this.authService
      .registerUser(email)
      .then((response) => {
        this.isLoading = false;
        this._snackBar.open('User registered successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/client/dashboard']);
      })
      .catch((error) => {
        this.isLoading = false;
        console.error(error);
      });
  }

  openRegisteDialog(email: string): void {
    const dialogRef = this.dialog.open(NewUserDialogComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { email },
      width: '80%',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.email && result.confirm) {
        this.registerUser(email);
      }
    });
  }
}
