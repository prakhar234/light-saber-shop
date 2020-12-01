import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SabersComponent } from './sabers.component';

describe('SabersComponent', () => {
  let component: SabersComponent;
  let fixture: ComponentFixture<SabersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SabersComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
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
