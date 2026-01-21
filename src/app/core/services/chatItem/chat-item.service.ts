import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ChatItemToAddDto } from '../../models/chatItem/chatItemToAddDto';
import { Observable } from 'rxjs';
import { ChatItemToReturnDto } from '../../models/chatItem/chatItemToReturnDto';

@Injectable({
  providedIn: 'root'
})
export class ChatItemService {
   baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);

  createChatItem(chatItemToAdd:ChatItemToAddDto): Observable<ChatItemToReturnDto>{
    return this.http.post<ChatItemToReturnDto>(`${this.baseUrl}/chatItem`, chatItemToAdd, {withCredentials: true});
  }

}
