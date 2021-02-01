import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GithubupdatesComponent } from './githubupdates.component';

describe('GithubupdatesComponent', () => {
  let component: GithubupdatesComponent;
  let fixture: ComponentFixture<GithubupdatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubupdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubupdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
