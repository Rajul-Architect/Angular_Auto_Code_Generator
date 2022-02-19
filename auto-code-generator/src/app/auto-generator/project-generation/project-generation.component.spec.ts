import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGenerationComponent } from './project-generation.component';

describe('ProjectGenerationComponent', () => {
  let component: ProjectGenerationComponent;
  let fixture: ComponentFixture<ProjectGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
