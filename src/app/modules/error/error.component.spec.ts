import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let location: Location;

  beforeEach(async () => {
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [ErrorComponent],
      providers: [{ provide: Location, useValue: locationSpy }],
    }).compileComponents();

    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call Location.back when goBack is called', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
