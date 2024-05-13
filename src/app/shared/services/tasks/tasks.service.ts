import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getAllTask(): Promise<any> {
    return firstValueFrom(this.http.get(`${environment.apiUrl}/tasks`));
  }

  getAllPendingTask(): Promise<any> {
    return firstValueFrom(this.http.get(`${environment.apiUrl}/tasks/pending`));
  }

  markTaskAsCompleted(taskId: string): Promise<any> {
    return firstValueFrom(
      this.http.patch(`${environment.apiUrl}/tasks/${taskId}/completed`, {})
    );
  }

  editTask(taskId: string, title: string, description: string): Promise<any> {
    return firstValueFrom(
      this.http.put(`${environment.apiUrl}/tasks/${taskId}`, {
        title,
        description,
      })
    );
  }

  deleteTask(taskId: string): Promise<any> {
    return firstValueFrom(
      this.http.delete(`${environment.apiUrl}/tasks/${taskId}`)
    );
  }

  createTask(title: string, description: string): Promise<any> {
    return firstValueFrom(
      this.http.post(`${environment.apiUrl}/tasks`, {
        title,
        description,
      })
    );
  }
}
