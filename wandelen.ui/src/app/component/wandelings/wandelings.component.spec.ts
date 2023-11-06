import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WandelingsComponent } from './wandelings.component';

describe('WandelingsComponent', () => {
  let component: WandelingsComponent;
  let fixture: ComponentFixture<WandelingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WandelingsComponent]
    });
    fixture = TestBed.createComponent(WandelingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
