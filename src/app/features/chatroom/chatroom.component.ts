import { Component, inject, OnInit, signal } from '@angular/core';
import { ChatItemToReturnDto } from '../../core/models/chatItem/chatItemToReturnDto';
import { ChatroomService } from '../../core/services/chatroom/chatroom.service';
import { ActivatedRoute } from '@angular/router';
import { ChatRoomToReturnDto } from '../../core/models/chatRoom/chatRoomToReturnDto';
import { ChatItemToAddDto } from '../../core/models/chatItem/chatItemToAddDto';
import { ChatItemComponent } from "../chat-item/chat-item.component";
import { ChatItemService } from '../../core/services/chatItem/chat-item.service';
import { AccountService } from '../../core/services/account/account.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-chatroom',
  imports: [ChatItemComponent],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})
export class ChatroomComponent implements OnInit{
  chatRoom = signal<ChatRoomToReturnDto | null>(null);
  private chatRoomService = inject(ChatroomService);
  private chatItemService = inject(ChatItemService);
  private accountService = inject(AccountService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadChatRoom();
  }

  loadChatRoom(){
    let id = this.route.snapshot.paramMap.get('id');
    if(!id){
      return;
    }
    this.chatRoomService.getChatRoom(+id).subscribe({
      next: res => {
        this.chatRoom.set(res);
      }
    });
  }

  //See https://claude.ai/chat/1b7f22d9-b33d-4d01-a674-5f531b2d591b for explanations!
  addChatItemToRoom(message: string) {
  const id = this.route.snapshot.paramMap.get('id');
  const currentUser = this.accountService.currentUser();

  if (!id || !currentUser?.email) {
    return;
  }

  console.log('chatroomComponent::addChatItemToRoom. Message: ', message);

  const chatItemToAdd: ChatItemToAddDto = {
    userId: currentUser.email,
    message,
    createdAt: new Date()
  };

  this.chatItemService.createChatItem(chatItemToAdd).pipe(
      switchMap(chatItem =>
        this.chatRoomService.addChatItemToRoom(+id, chatItem.id)
      )
    )
    .subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
}
}
