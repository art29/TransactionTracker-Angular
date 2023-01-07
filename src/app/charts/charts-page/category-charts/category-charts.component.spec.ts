import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryChartsComponent } from './category-charts.component';

describe('CategoryChartsComponent', () => {
  let component: CategoryChartsComponent;
  let fixture: ComponentFixture<CategoryChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryChartsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
