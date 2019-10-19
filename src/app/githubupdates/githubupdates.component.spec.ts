import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubupdatesComponent } from './githubupdates.component';

describe('GithubupdatesComponent', () => {
  let component: GithubupdatesComponent;
  let fixture: ComponentFixture<GithubupdatesComponent>;

  beforeEach(async(() => {
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
