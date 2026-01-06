import { Component, inject, OnInit, signal } from '@angular/core';
import { ChatItemToReturnDto } from '../../core/models/chatItem/chatItemToReturnDto';
import { ChatroomService } from '../../core/services/chatroom/chatroom.service';
import { ActivatedRoute } from '@angular/router';
import { ChatRoomToReturnDto } from '../../core/models/chatRoom/chatRoomToReturnDto';

@Component({
  selector: 'app-chatroom',
  imports: [],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css'
})
export class ChatroomComponent implements OnInit{
  chatRoom = signal<ChatRoomToReturnDto | null>(null);
  private chatRoomService = inject(ChatroomService);
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
}
