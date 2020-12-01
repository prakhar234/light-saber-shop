import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { SaberComponent } from './saber.component';
import { Saber } from './saber.modal';

describe('SaberComponent', () => {
  let component: SaberComponent;
  let expectedSaber: Saber;
  let fixture: ComponentFixture<SaberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaberComponent ],
      imports: [RouterTestingModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaberComponent);
    component = fixture.componentInstance;
    expectedSaber = {
      "id": "0",
      "name":"Sith Saber",
      "available":27,
      "crystal":{
          "name":"Kadril saber",
          "color":"red",
          "planet":13,
          "powerUsage": 80
      }
    }
    component.saber=expectedSaber;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
