import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApipopupComponent } from './apipopup.component';

describe('ApipopupComponent', () => {
  let component: ApipopupComponent;
  let fixture: ComponentFixture<ApipopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApipopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApipopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
