import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent, DialogData } from './confirm-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };
  const dialogData: DialogData = {
    task: {
      id: '1',
      title: 'Test Task dialog',
      description: 'Test Description dialog',
      createdAt: new Date(),
      isCompleted: false,
    },
    title: 'Test Title',
    description: 'Test Description',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatButtonModule],
      providers: [
        ConfirmDialogComponent,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with confirmed data', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalledWith({ confirmed: true });
  });
});
