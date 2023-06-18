import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaComponent } from './alpha.component';

describe('AlphaComponent', () => {
  let component: AlphaComponent;
  let fixture: ComponentFixture<AlphaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlphaComponent]
    });
    fixture = TestBed.createComponent(AlphaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
