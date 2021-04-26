import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelfinderComponent } from './modelfinder.component';

describe('ModelfinderComponent', () => {
  let component: ModelfinderComponent;
  let fixture: ComponentFixture<ModelfinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelfinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
