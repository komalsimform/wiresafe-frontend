import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChannelComponent } from './channel/channel.component';
import { AuthGuard } from './auth.guard';
import { MessageComponent } from './message/message.component';
import { AttachmentListComponent } from './message/attachment-list/attachment-list.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'channel', component:ChannelComponent,canActivate: [AuthGuard]},
  {path:'channel/:id/message',component:MessageComponent},
  {path:'channel/:channelid/attachmentlist',component:AttachmentListComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
