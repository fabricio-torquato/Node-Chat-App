var expect = require('expect');
var {
    generateMessage, generateLocationMessage
} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Luiz'
        var text = 'Welcome to the message test'
        var res = generateMessage(from, text);

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({ from, text });
    });

})

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Luiz';
        var latitude = 23.7100653;
        var longitude = -47.4274998;
        var url = 'https://google.com/maps?q=' + latitude + ',' + longitude;
        var res = generateLocationMessage(from, latitude, longitude);

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({ from, url, createdAt });
       // expect(res.url).toBeA();
    })
})