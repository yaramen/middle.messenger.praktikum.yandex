import { HTTPTransport } from '../modules/HTTPTransport';
import { baseUrl } from './baseUrl';
import { ChatListType, User } from '../types/model';

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

    public static getWebSocketToken(id: number): Promise<{ token:string }> {
        return HTTPTransport.post(baseUrl + `/chats/token/${id}`, {}) as Promise<{ token:string }>;
    }

    public static addUser(chatId: number, userId: number) {
        return HTTPTransport.put(baseUrl + '/chats/users', { data: { chatId, users: [userId] } });
    }

    public static removeUser(chatId: number, userId: number) {
        return HTTPTransport.delete(baseUrl + '/chats/users', { data: { chatId, users: [userId] } });
    }

    public static userList(chatId:number): Promise<User[]> {
        return HTTPTransport.get(baseUrl + `/chats/${chatId}/users`, {}) as Promise<User[]>;
    }

    public static sendResource(file: File): Promise<{ id: number }> {
        const formData = new FormData();
        formData.append('resource', file);
        return HTTPTransport.post(baseUrl + '/resources', {
            data: formData,
        }) as Promise<{ id: number }>;
    }
}

export {
    ChatService,
};
