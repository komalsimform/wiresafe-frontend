import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingMessagesComponent } from './outgoing-messages.component';

describe('OutgoingMessagesComponent', () => {
  let component: OutgoingMessagesComponent;
  let fixture: ComponentFixture<OutgoingMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
