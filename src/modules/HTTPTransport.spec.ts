import { expect } from 'chai';
import sinon from 'sinon';
import { HTTPTransport, Method } from './HTTPTransport';

type Respond = {
    respond: (status: number, headers: Record<string, string>, response: string) => void
};

describe('http', () => {
    let requests: Respond[] = [];

    beforeEach(function () {
        this.xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        this.xhr.onCreate = function (xhr: Respond) {
            requests.push(xhr);
        };
    });

    afterEach(function () {
        this.xhr.restore();
    });

    it('should be return text ', () => {
        const callback = sinon.stub();
        HTTPTransport
            .request('/foo', { method: Method.GET })
            .then((data) => {
                callback(data);
                sinon.assert.calledWith(callback, 'OK');
            });

        expect(requests.length).to.equal(1);
        requests[0].respond(200, {}, 'OK');
    });

    it('should be return json ', () => {
        const callback = sinon.stub();
        HTTPTransport
            .request('/foo', { method: Method.GET })
            .then((data) => {
                callback(data);
                sinon.assert.calledWith(callback, { id: 1 });
            });

        expect(requests.length).to.equal(1);
        requests[0].respond(200, {}, '{"id": 1}');
    });

    it('should be call all method ', () => {
        const methods: Method[] = [
            Method.GET,
            Method.POST,
            Method.PUT,
            Method.PATCH,
            Method.DELETE,
        ];

        for (const index in methods) {
            const callback = sinon.stub();
            HTTPTransport
                .request('/foo', { method: methods[index] })
                .then((data) => {
                    callback(data);
                    sinon.assert.calledWith(callback, 'OK');
                });

            requests[index].respond(200, {}, 'OK');
        }

        expect(requests.length).to.equal(methods.length);
    });

    it('should be bad response', () => {
        HTTPTransport
            .request('/foo', { method: Method.GET })
            .then(() => {
                throw new Error('Error');
            });

        expect(requests.length).to.equal(1);
        requests[0].respond(400, {}, 'OK');
    });
});
