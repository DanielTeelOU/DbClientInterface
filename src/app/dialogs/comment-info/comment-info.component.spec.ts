import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommentInfoComponent } from './comment-info.component';

describe('CommentInfoComponent', () => {
  let component: CommentInfoComponent;
  let fixture: ComponentFixture<CommentInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
