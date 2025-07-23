import { ChatItemToReturnDto } from "../chatItem/chatItemToReturnDto";
import { RegisterUser } from "../user/register";

export interface ChatRoomToReturnDto{
  id: number,
  registeredMembers: RegisterUser[],
  activeMembers: RegisterUser[],
  chatItems: ChatItemToReturnDto[]
}

