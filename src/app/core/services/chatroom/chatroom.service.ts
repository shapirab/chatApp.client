import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ChatItemToReturnDto } from '../../models/chatItem/chatItemToReturnDto';
import { ChatRoomToReturnDto } from '../../models/chatRoom/chatRoomToReturnDto';
import ChatRoomParams from '../../models/chatRoom/chatRoomParams';
import { Pagination } from '../../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  baseUrl: string = environment.apiUrl;
  private http = inject(HttpClient);
  private paginationMetadataSubject = new BehaviorSubject<Pagination>({
    TotalItemCount: 0,
    pageSize: 0,
    pageNumber: 0
  });
  paginationMetadata$ = this.paginationMetadataSubject.asObservable();

  getChatrooms(chatRoomParams: ChatRoomParams): Observable<{chatRooms: ChatRoomToReturnDto[], paginationMetadata: any}>{
    console.log('chatroomService::getChatrooms called')
    let params = new HttpParams();

    if(chatRoomParams.activeMemberId){
      params = params.append('activeMemberId', chatRoomParams.activeMemberId);
    }
    if(chatRoomParams.registeredMemberId){
      params = params.append('registeredMemberId', chatRoomParams.registeredMemberId);
    }
    if(chatRoomParams.search){
      params = params.append('searchQuery', chatRoomParams.search);
    }

    params = params.append('pageSize', chatRoomParams.pageSize);
    params = params.append('pageNumber', chatRoomParams.pageNumber);

    return this.http.get<ChatRoomToReturnDto[]>(`${this.baseUrl}/chatRoom`, { params, observe: 'response' })
      .pipe(
        map(response => {
            console.log('chatroomService::getChatrooms response: ', response.body)
            let paginationHeader = response.headers.get('X-Pagination');
            this.paginationMetadataSubject.next(JSON.parse(paginationHeader!));
            return {
              chatRooms: response.body || [],
              paginationMetadata: JSON.parse(paginationHeader!)
            };
        })
      );
  }

  getChatRoom(id:number): Observable<ChatRoomToReturnDto>{
    return this.http.get<ChatRoomToReturnDto>(`${this.baseUrl}/chatRoom/${id}`);
  }

  addChatItemToRoom(chatRoomId:number, chatItemId:number): Observable<ChatItemToReturnDto>{
    return this.http.post<ChatItemToReturnDto>(`${this.baseUrl}/chatRoom/messages/${chatRoomId}?chatItemId=${chatItemId}`, {}, {withCredentials: true});
  }

}
