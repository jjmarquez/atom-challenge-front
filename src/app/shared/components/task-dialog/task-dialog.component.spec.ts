import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TaskDialogComponent, DialogData } from './task-dialog.component';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };
  const dialogData: DialogData = {
    title: 'Test Title',
    description: 'Test Description',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        TaskDialogComponent,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with dialog data', () => {
    expect(component.form.value).toEqual(dialogData);
  });

  it('should close dialog when onNoClick is called', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
