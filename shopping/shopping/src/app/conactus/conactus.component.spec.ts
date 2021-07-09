import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConactusComponent } from './conactus.component';

describe('ConactusComponent', () => {
  let component: ConactusComponent;
  let fixture: ComponentFixture<ConactusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConactusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
