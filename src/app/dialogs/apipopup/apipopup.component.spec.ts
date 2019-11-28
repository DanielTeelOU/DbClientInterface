import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApipopupComponent } from './apipopup.component';

describe('ApipopupComponent', () => {
  let component: ApipopupComponent;
  let fixture: ComponentFixture<ApipopupComponent>;

  beforeEach(async(() => {
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
