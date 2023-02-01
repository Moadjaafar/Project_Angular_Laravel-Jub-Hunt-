import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOfrComponent } from './update-ofr.component';

describe('UpdateOfrComponent', () => {
  let component: UpdateOfrComponent;
  let fixture: ComponentFixture<UpdateOfrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOfrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOfrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
