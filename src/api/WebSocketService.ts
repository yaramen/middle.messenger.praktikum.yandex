import { ChatService } from './ChatService';
import { wsUrl } from './baseUrl';
import { store } from '../modules/store';
import { actions } from '../modules/actions';
import { scrollChatToBottom, scrollToMessage } from '../modules/scrollChat';
import { requestError } from '../modules/requestError';

const PING_INTERVAL = 30000;

class WebSocketService {
    static instance?: WebSocketService = undefined;

    private ws: WebSocket;

    private token: string = '';

    private chatId: number = 0;

    private userId: number = 0;

    private pingInterval: number = 0;

    private constructor(userId: number, chatId: number) {
        this.userId = userId;
        this.chatId = chatId;
        this.connect();
    }

    private async connect() {
        try {
            const { token } = await ChatService.getWebSocketToken(this.chatId);
            this.token = token;
            this.ws = new WebSocket(`${wsUrl}/${this.userId}/${this.chatId}/${this.token}`);
            this.ws.addEventListener('open', this.init.bind(this));
        } catch (xhr) {
            requestError(xhr);
        }
    }

    private init() {
        this.addListener();
        this.addPing();
        this.getMessages();
    }

    private getMessages() {
        this.ws && this.ws.send(JSON.stringify({
            content: '0',
            type: 'get old',
        }));
    }

    public async loadMessageMore(lastId: number) {
        this.ws && this.ws.send(JSON.stringify({
            content: lastId.toString(),
            type: 'get old',
        }));
    }

    private addPing() {
        this.pingInterval = setInterval(
            () => this.ws.send(JSON.stringify({ type: 'ping' })),
            PING_INTERVAL,
        );
    }

    private addListener() {
        this.ws.addEventListener('message', (event) => {
            const { data: dataString } = event;
            try {
                const data = JSON.parse(dataString);

                if (typeof data === 'object') {
                    if (data instanceof Array) {
                        const last = store.getState().messages[0];
                        if (data.length) {
                            store.dispatch(actions.responseMessageList(data));
                            last && scrollToMessage(last.id);
                        }
                    }
                    if (data instanceof Object && (data.type === 'message' || data.type === 'file')) {
                        store.dispatch(actions.responseMessage(data));
                        scrollChatToBottom();
                    }
                }
            } catch (err) {
                console.warn('error ws data', err);
            }
        });
    }

    static createInstance(userId: number, chatId: number) {
        if (WebSocketService.instance) {
            WebSocketService.instance.disconnect();
        }

        WebSocketService.instance = new WebSocketService(userId, chatId);
        return WebSocketService.instance;
    }

    static getInstance(): WebSocketService | undefined {
        return WebSocketService.instance;
    }

    sendMessage(message: string) {
        this.ws && this.ws.send(JSON.stringify({
            content: message,
            type: 'message',
        }));
    }

    sendFile(fileId: string) {
        this.ws && this.ws.send(JSON.stringify({
            content: fileId,
            type: 'file',
        }));
    }

    disconnect() {
        this.ws && this.ws.close();
        this.pingInterval && clearInterval(this.pingInterval);
        WebSocketService.instance = undefined;
    }
}

export {
    WebSocketService,
};
