import { ChatItemToReturnDto } from "../chatItem/chatItemToReturnDto";
import { RegisterUser } from "../user/register";

export interface ChatRoomToAddDto{
  registeredMembers: RegisterUser[],
  activeMembers: RegisterUser[],
  chatItems: ChatItemToReturnDto[]
}
