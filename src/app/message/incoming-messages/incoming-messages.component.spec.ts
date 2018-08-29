import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingMessagesComponent } from './incoming-messages.component';

describe('IncomingMessagesComponent', () => {
  let component: IncomingMessagesComponent;
  let fixture: ComponentFixture<IncomingMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
