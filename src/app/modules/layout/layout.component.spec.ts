import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LayoutComponent],
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /auth when logout is called', () => {
    component.logout();
    expect(router.navigate).toHaveBeenCalledWith(['/auth']);
  });
});
