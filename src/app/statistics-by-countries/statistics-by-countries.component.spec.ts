import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsByCountriesComponent } from './statistics-by-countries.component';

describe('StatisticsByCountriesComponent', () => {
  let component: StatisticsByCountriesComponent;
  let fixture: ComponentFixture<StatisticsByCountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsByCountriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsByCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
