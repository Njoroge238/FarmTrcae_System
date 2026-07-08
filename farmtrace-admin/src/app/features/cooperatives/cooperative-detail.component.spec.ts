import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperativeDetailComponent } from './cooperative-detail.component';

describe('CooperativeDetailComponent', () => {
  let component: CooperativeDetailComponent;
  let fixture: ComponentFixture<CooperativeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CooperativeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooperativeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
