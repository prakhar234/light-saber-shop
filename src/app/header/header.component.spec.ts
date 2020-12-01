import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { LoginService } from '../login/login.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let navBar: HTMLElement;
  let navBarRight: HTMLElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    navBar = fixture.nativeElement.querySelector('.all-links');
    navBarRight = fixture.nativeElement.querySelector('.navbar-right');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have navigation menu with two items when not signed in', () => {
    expect(navBar.childElementCount).toBe(2);
  });
  it('should not have admin navigation items when not signed in', () => {
    expect(navBarRight.childElementCount).toBe(0);
  });
});
