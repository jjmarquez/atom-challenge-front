import { Component, OnInit } from '@angular/core';
import { Task } from './models/task';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TasksService } from '../../services/tasks/tasks.service';
import { PipesModule } from '../../pipes/pipes.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { TaskDialogComponent } from '../../shared/components/task-dialog/task-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    PipesModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [TasksService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  isLoading = true;

  constructor(
    private readonly tasksService: TasksService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllPendingTask();
  }

  getAllPendingTask() {
    this.tasksService
      .getAllPendingTask()
      .then((tasks) => {
        if (tasks) {
          this.tasks = tasks.data;
        }
        this.isLoading = false;
      })
      .catch((error) => {
        console.error(error);
        this.isLoading = false;
      });
  }

  completeTask(task: Task) {
    this.openDialog(
      task,
      'Complete Task',
      `Are you sure you want to complete this task? Title: ${task.title}`
    );
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { title: task.title, description: task.description },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.callEditTask(task.id, result.title, result.description);
      }
    });
  }

  callEditTask(taskId: string, title: string, description: string) {
    this.isLoading = true;
    this.tasksService.editTask(taskId, title, description).then(() => {
      this.getAllPendingTask();
    });
  }

  openDialog(task: Task, title: string, description: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: {
        task,
        title: title,
        description: description,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.confirmed) {
        if (task.id) this.markTaskAsCompleted(task.id);
      }
    });
  }

  markTaskAsCompleted(taskId: string) {
    this.isLoading = true;
    this.tasksService
      .markTaskAsCompleted(taskId)
      .then(() => {
        this.getAllPendingTask();
      })
      .catch((error) => {
        console.error(error);
        this.isLoading = false;
      });
  }

  openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: {
        task,
        title: 'Delete Task',
        description: `Are you sure you want to delete this task - ${task.title}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.confirmed) {
        if (task.id) this.callDeleteTask(task.id);
      }
    });
  }

  callDeleteTask(taskId: string) {
    this.isLoading = true;
    this.tasksService
      .deleteTask(taskId)
      .then(() => {
        this.getAllPendingTask();
      })
      .catch((error) => {
        console.error(error);
        this.isLoading = false;
      });
  }

  createNewTask() {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { title: '', description: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createTask(result.title, result.description);
      }
    });
  }

  createTask(title: string, description: string) {
    this.isLoading = true;
    this.tasksService.createTask(title, description).then(() => {
      this.getAllPendingTask();
    });
  }
}
