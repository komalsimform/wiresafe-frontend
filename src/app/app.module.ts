import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChannelComponent } from './channel/channel.component';
import { MessageComponent } from './message/message.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ChannelDetailComponent } from './channel/channel-detail/channel-detail.component';
import { SendMessageComponent } from './message/send-message/send-message.component';
import { AttachmentListComponent } from './message/attachment-list/attachment-list.component';
import { IncomingMessagesComponent } from './message/incoming-messages/incoming-messages.component';
import { OutgoingMessagesComponent } from './message/outgoing-messages/outgoing-messages.component';
import { FormsModule } from '@angular/forms';
import { GroupByPipe } from './shared/pipe/groupBy.pipe';
import { customDateFormatPipe } from './shared/pipe/customDateFormat.pipe';
import { DatePipe } from '@angular/common';
import { FileUploadModule  } from 'ng2-file-upload';
import {ToasterModule} from 'angular2-toaster';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChannelComponent,
    MessageComponent,
    HeaderComponent,
    FooterComponent,
    ChannelDetailComponent,
    SendMessageComponent,
    AttachmentListComponent,
    IncomingMessagesComponent,
    OutgoingMessagesComponent,
    GroupByPipe,
    customDateFormatPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    HttpModule,
    FormsModule,
    ToasterModule.forRoot(),
    FileUploadModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
