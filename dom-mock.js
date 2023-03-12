const register = require('ignore-styles');

register.default(['.css']);

require('jsdom-global')('<html><head><title>title</title></head><body><div id="root"></div></body></html>', {
    url: 'https://example.org/',
    referrer: 'https://example.com/',
});
