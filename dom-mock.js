// eslint-disable-next-line import/no-extraneous-dependencies
require('jsdom-global')('<html><head><title>title</title></head><body><div id="root"></div></body></html>', {
    url: 'https://example.org/',
    referrer: 'https://example.com/',
});
