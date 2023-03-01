import { HTTPTransport } from '../modules/HTTPTransport';
import { baseUrl } from './baseUrl';
import { ChatListType } from '../types/model';

class ChatService {
    public static chatList() {
        return HTTPTransport.get(baseUrl + '/chats', {}) as Promise<ChatListType>;
    }

    public static createChat(title: string) {
        return HTTPTransport.post(baseUrl + '/chats', { data: { title } });
    }

    public static removeChat(id: number) {
        return HTTPTransport.delete(baseUrl + '/chats', { data: { chatId: id } });
    }
}

export {
    ChatService,
};
