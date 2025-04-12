import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UbiPage } from './ubi.page';

describe('UbiPage', () => {
  let component: UbiPage;
  let fixture: ComponentFixture<UbiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UbiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
