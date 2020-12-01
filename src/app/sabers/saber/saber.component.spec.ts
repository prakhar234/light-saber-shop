import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaberComponent } from './saber.component';

describe('SaberComponent', () => {
  let component: SaberComponent;
  let fixture: ComponentFixture<SaberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
