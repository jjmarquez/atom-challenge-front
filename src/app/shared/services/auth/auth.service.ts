import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string): Promise<any> {
    return firstValueFrom(
      this.http.get(`${environment.apiUrl}/users/${email}`)
    );
  }

  getAllUsers(): Promise<any> {
    return firstValueFrom(this.http.get(`${environment.apiUrl}/users`));
  }

  registerUser(email: string): Promise<any> {
    return firstValueFrom(
      this.http.post(`${environment.apiUrl}/users`, {
        email,
      })
    );
  }
}
