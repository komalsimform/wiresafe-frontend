import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChannelComponent } from './channel/channel.component';
import { MessageComponent } from './message/message.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RecieveMessageComponent } from './message/recieve-message/recieve-message.component';
import { ChannelDetailComponent } from './channel/channel-detail/channel-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChannelComponent,
    MessageComponent,
    HeaderComponent,
    FooterComponent,
    RecieveMessageComponent,
    ChannelDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
