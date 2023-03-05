import { HTTPTransport } from '../modules/HTTPTransport';
import { User } from '../types/model';
import { baseUrl } from './baseUrl';

class UserService {
    public static updateProfile(profile: User) {
        return HTTPTransport.put(baseUrl + '/user/profile', {
            data: profile,
        });
    }

    public static updatePassword(data: {
        oldPassword: string,
        newPassword: string,
    }) {
        return HTTPTransport.put(baseUrl + '/user/password', {
            data,
        });
    }

    public static updateAvatar(avatar: File): Promise<User> {
        const formData = new FormData();
        formData.append('avatar', avatar);

        return HTTPTransport.put(baseUrl + '/user/profile/avatar', {
            data: formData,
        }) as Promise<User>;
    }

    public static search(login: string): Promise<User[]> {
        return HTTPTransport.post(baseUrl + '/user/search', {
            data: {
                login,
            },
        }) as Promise<User[]>;
    }
}

export {
    UserService,
};
