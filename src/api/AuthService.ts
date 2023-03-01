import { HTTPTransport } from '../modules/HTTPTransport';
import { NewUser, User } from '../types/model';
import { baseUrl } from './baseUrl';

class AuthService {
    public static login(login: string, password: string): Promise<string> {
        return HTTPTransport.post(baseUrl + '/auth/signin', {
            data: {
                login,
                password,
            },
        }) as Promise<string>;
    }

    public static signup(newUser: NewUser) {
        return HTTPTransport.post(baseUrl + '/auth/signup', {
            data: newUser,
        });
    }

    public static user(): Promise<User> {
        return HTTPTransport.get(baseUrl + '/auth/user', {}) as Promise<User>;
    }

    public static logout() {
        return HTTPTransport.post(baseUrl + '/auth/logout', {});
    }
}

export {
    AuthService,
};
