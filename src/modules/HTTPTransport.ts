enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

function queryStringify(data: Record<string, string>) {
    return '?' + Object.keys(data).map((key) => `${key}=${data[key]}`).join('&');
}

type Options = {
    timeout?: number,
    method?: Method,
    data?: Document | XMLHttpRequestBodyInit | Record<string, string> | null,
    headers?: Record<string, string>,
};

type HTTPMethod = (url: string, options: Options) => Promise<unknown>;

class HTTPTransport {
    static get: HTTPMethod = (url, options = {}) => HTTPTransport.request(url, {
        ...options,
        method: Method.GET,
    }, options.timeout);

    static post: HTTPMethod = (url, options = {}) => HTTPTransport.request(url, {
        ...options,
        method: Method.POST,
    }, options.timeout);

    static put: HTTPMethod = (url, options = {}) => HTTPTransport.request(url, {
        ...options,
        method: Method.PUT,
    }, options.timeout);

    static patch: HTTPMethod = (url, options = {}) => HTTPTransport.request(url, {
        ...options,
        method: Method.PATCH,
    }, options.timeout);

    static delete: HTTPMethod = (url, options = {}) => HTTPTransport.request(url, {
        ...options,
        method: Method.DELETE,
    }, options.timeout);

    static request = (url: string, options: Options & { method: Method }, timeout = 5000) => {
        const {
            method, data, headers,
        } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.timeout = timeout;

            const urlPath = method === Method.GET && data
                ? url + queryStringify(data as Record<string, string>)
                : url;

            xhr.open(method, urlPath);
            if (headers) {
                Object.keys(headers).forEach((key) => xhr.setRequestHeader(key, headers[key]));
            }

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === Method.GET) {
                xhr.send();
            } else {
                xhr.send(data as Document | XMLHttpRequestBodyInit | null);
            }
        });
    };
}

export {
    HTTPTransport,
};
