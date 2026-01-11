import { Component, Input } from '@angular/core';
import { ChatItemToReturnDto } from '../../core/models/chatItem/chatItemToReturnDto';

@Component({
  selector: 'app-chat-item',
  imports: [],
  templateUrl: './chat-item.component.html',
  styleUrl: './chat-item.component.css'
})
export class ChatItemComponent {
  @Input() chatItem?: ChatItemToReturnDto;
}
