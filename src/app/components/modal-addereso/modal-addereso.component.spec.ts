import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdderesoComponent } from './modal-addereso.component';

describe('ModalAdderesoComponent', () => {
  let component: ModalAdderesoComponent;
  let fixture: ComponentFixture<ModalAdderesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAdderesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdderesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
