import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { TasksService } from '../../services/tasks/tasks.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Task } from './models/task';
import { TaskDialogComponent } from '../../shared/components/task-dialog/task-dialog.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let tasksService: TasksService;
  let dialog: MatDialog;

  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    createdAt: new Date(),
    isCompleted: false,
  };

  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}) }); // create spy object for MatDialogRef
  let matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']); // create spy object for MatDialog

  beforeEach(async () => {
    const tasksServiceMock = jasmine.createSpyObj('TasksService', [
      'createTask',
      'getAllPendingTask',
      'editTask',
      'markTaskAsCompleted',
      'deleteTask',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DashboardComponent,
        { provide: TasksService, useValue: tasksServiceMock },
        {
          provide: MatDialog,
          useValue: matDialogSpy,
        },
      ],
    }).compileComponents();

    component = TestBed.inject(DashboardComponent);
    tasksService = TestBed.inject(TasksService) as jasmine.SpyObj<TasksService>;
    tasksServiceMock.createTask.and.returnValue(Promise.resolve()); // mock the createTask method
    tasksServiceMock.getAllPendingTask.and.returnValue(
      Promise.resolve({ data: [] })
    );
    tasksServiceMock.editTask.and.returnValue(Promise.resolve()); // mock the editTask method
    tasksServiceMock.markTaskAsCompleted.and.returnValue(Promise.resolve()); // mock the markTaskAsCompleted method
    tasksServiceMock.deleteTask.and.returnValue(Promise.resolve()); // mock the deleteTask method

    dialog = TestBed.inject(MatDialog);
    matDialogSpy.open.and.returnValue(dialogRefSpyObj); // mock the dialog open method

    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllPendingTask on init', () => {
    expect(tasksService.getAllPendingTask).toHaveBeenCalled();
  });

  it('should call openDialog with correct arguments when completeTask is called', () => {
    const task: Task = mockTask;
    const dialogSpy = spyOn(component, 'openDialog');

    component.completeTask(task);

    expect(dialogSpy).toHaveBeenCalledWith(
      task,
      'Complete Task',
      `Are you sure you want to complete this task? Title: ${task.title}`
    );
  });

  it('should open dialog with correct data and call callEditTask with correct arguments when editTask is called', () => {
    const task: Task = mockTask;
    const result = {
      title: 'Updated Title',
      description: 'Updated Description',
    };
    dialogRefSpyObj.afterClosed.and.returnValue(of(result)); // mock the afterClosed method
    const callEditTaskSpy = spyOn(component, 'callEditTask');

    component.editTask(task);

    expect(matDialogSpy.open).toHaveBeenCalledWith(TaskDialogComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { title: task.title, description: task.description },
    });
    expect(callEditTaskSpy).toHaveBeenCalledWith(
      task.id,
      result.title,
      result.description
    );
  });

  it('should call editTask with correct arguments and then call getAllPendingTask when callEditTask is called', async () => {
    const taskId = '1';
    const title = 'Updated Title';
    const description = 'Updated Description';

    const getAllPendingTaskSpy = spyOn(component, 'getAllPendingTask');

    await component.callEditTask(taskId, title, description);

    expect(tasksService.editTask).toHaveBeenCalledWith(
      taskId,
      title,
      description
    );
    expect(getAllPendingTaskSpy).toHaveBeenCalled();
  });

  it('should open dialog with correct data and call callDeleteTask with correct argument when openDeleteDialog is called and result is confirmed', () => {
    const task: Task = mockTask;
    const result = { confirmed: true };
    dialogRefSpyObj.afterClosed.and.returnValue(of(result)); // mock the afterClosed method
    const callDeleteTaskSpy = spyOn(component, 'callDeleteTask');

    component.openDeleteDialog(task);

    expect(matDialogSpy.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: {
        task,
        title: 'Delete Task',
        description: `Are you sure you want to delete this task - ${task.title}?`,
      },
    });
    expect(callDeleteTaskSpy).toHaveBeenCalledWith(task.id);
  });

  it('should call markTaskAsCompleted with correct argument and then call getAllPendingTask when markTaskAsCompleted is called', async () => {
    const taskId = '1';
    const getAllPendingTaskSpy = spyOn(component, 'getAllPendingTask');

    await component.markTaskAsCompleted(taskId);

    expect(tasksService.markTaskAsCompleted).toHaveBeenCalledWith(taskId);
    expect(getAllPendingTaskSpy).toHaveBeenCalled();
  });

  it('should open dialog with correct data and call callDeleteTask with correct argument when openDeleteDialog is called and result is confirmed', () => {
    const task: Task = mockTask;
    const result = { confirmed: true };
    dialogRefSpyObj.afterClosed.and.returnValue(of(result)); // mock the afterClosed method
    const callDeleteTaskSpy = spyOn(component, 'callDeleteTask');

    component.openDeleteDialog(task);

    expect(matDialogSpy.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: {
        task,
        title: 'Delete Task',
        description: `Are you sure you want to delete this task - ${task.title}?`,
      },
    });
    expect(callDeleteTaskSpy).toHaveBeenCalledWith(task.id);
  });

  it('should call deleteTask with correct argument and then call getAllPendingTask when callDeleteTask is called', async () => {
    const taskId = '1';
    const getAllPendingTaskSpy = spyOn(component, 'getAllPendingTask');

    await component.callDeleteTask(taskId);

    expect(tasksService.deleteTask).toHaveBeenCalledWith(taskId);
    expect(getAllPendingTaskSpy).toHaveBeenCalled();
  });

  it('should open dialog with correct data and call createTask with correct arguments when createNewTask is called and result is returned', () => {
    const result = {
      title: 'New Task',
      description: 'New Description',
    };
    dialogRefSpyObj.afterClosed.and.returnValue(of(result)); // mock the afterClosed method
    const createTaskSpy = spyOn(component, 'createTask');

    component.createNewTask();

    expect(matDialogSpy.open).toHaveBeenCalledWith(TaskDialogComponent, {
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: { title: '', description: '' },
    });
    expect(createTaskSpy).toHaveBeenCalledWith(
      result.title,
      result.description
    );
  });

  it('should call createTask with correct arguments and then call getAllPendingTask when createTask is called', async () => {
    const title = 'New Task';
    const description = 'New Description';
    const getAllPendingTaskSpy = spyOn(component, 'getAllPendingTask');

    await component.createTask(title, description);

    expect(tasksService.createTask).toHaveBeenCalledWith(title, description);
    expect(getAllPendingTaskSpy).toHaveBeenCalled();
  });

  it('should open dialog with correct data and call markTaskAsCompleted with correct argument when openDialog is called and result is confirmed', () => {
    const task: Task = mockTask;
    const title = 'Confirm Task';
    const description = 'Confirm Description';
    const result = { confirmed: true };
    dialogRefSpyObj.afterClosed.and.returnValue(of(result)); // mock the afterClosed method
    const markTaskAsCompletedSpy = spyOn(component, 'markTaskAsCompleted');

    component.openDialog(task, title, description);

    expect(matDialogSpy.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      data: {
        task,
        title: title,
        description: description,
      },
    });
    expect(markTaskAsCompletedSpy).toHaveBeenCalledWith(task.id);
  });
});
