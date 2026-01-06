import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account/account.service';
import { Router } from '@angular/router';
import { ChatItemToReturnDto } from '../../core/models/chatItem/chatItemToReturnDto';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import ChatRoomParams from '../../core/models/chatRoom/chatRoomParams';
import { ChatroomService } from '../../core/services/chatroom/chatroom.service';
import { ChatRoomToReturnDto } from '../../core/models/chatRoom/chatRoomToReturnDto';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  accountService = inject(AccountService);
  chatRoomService = inject(ChatroomService);
  selectedChatRoom?: ChatRoomToReturnDto;
  chatRooms:ChatRoomToReturnDto[] = [];

  private router = inject(Router);

  ngOnInit(): void {
    this.getChatrooms();
  }

  getChatrooms(){
    let chatRoomParams:ChatRoomParams ={
      registeredMemberId: '',
      activeMemberId: '',
      pageNumber: 1,
      pageSize: 10,
      search: ''
    };
    this.chatRoomService.getChatrooms(chatRoomParams).subscribe({
      next: res => {
        this.chatRooms = res.chatRooms;
        console.log('dashboardComponent::getChatrooms. service response:', res.chatRooms)
      },
      error: err => console.log(err)
    });

  }

  navigateToRoom(){
    if(this.selectedChatRoom){
      console.log('dashboardComponent::navigateToRoom(). SelectedRoom: ', this.selectedChatRoom.id);
      this.router.navigateByUrl(`chatroom/${this.selectedChatRoom.id}`);
    }
  }

  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }

}
