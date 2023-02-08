import { ChatMessage, Contact, Profile } from '../types/model';
import { contacts, messageList, profile } from './mockData';

function auth(login: string, password: string): Promise<Profile> {
    console.log('Call API:  auth', { login, password });
    return Promise.resolve(profile);
}

function checkIn(newUser: Profile) {
    console.log('Call API:  checkIn ', newUser);
    return Promise.resolve({
        status: 'Ok',
    });
}

function getContactList(id: number): Promise<Contact[]> {
    console.log('Call API:  getContactList', { id });

    return Promise.resolve(contacts);
}

function getMessages(id: number): Promise<Record<string, ChatMessage[]>> {
    console.log('Call API:  getMessages', { id });

    return Promise.resolve(messageList[id]);
}

export {
    auth,
    checkIn,
    getContactList,
    getMessages,
};
