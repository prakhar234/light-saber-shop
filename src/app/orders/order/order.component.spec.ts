import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Order } from 'src/app/shared/modals/order.modal';

import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let expectedOrder: Order;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderComponent ],
      imports: [BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    expectedOrder = {
      "accepted" : true,
      "contactDetails" : {
        "city" : "Amsterdam",
        "email" : "prakhar234@gmail.comm",
        "phoneNo" : "650080226",
        "postalCode" : "1062KA",
        "street" : "Wittgensteinlaan 17"
      },
      "cost" : 10150,
      "orderId" : "-MNQNzEUCprg0VYblDSK",
      "saberColor" : "Black",
      "saberCrystal" : "Dragite Gem",
      "saberId" : "2",
      "saberName" : "Dark Saber",
      "showDetail" : false
    };
    component.order = expectedOrder;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
