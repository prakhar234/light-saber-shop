import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SabersComponent } from './sabers.component';

describe('SabersComponent', () => {
  let component: SabersComponent;
  let fixture: ComponentFixture<SabersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SabersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SabersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
