import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesturlComponent } from './testurl.component';

describe('TesturlComponent', () => {
  let component: TesturlComponent;
  let fixture: ComponentFixture<TesturlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesturlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TesturlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
