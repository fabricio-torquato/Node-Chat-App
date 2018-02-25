var expect = require('expect');
var {
    generateMessage
} = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Luiz'
        var text = 'Welcome to the message test'
        var res = generateMessage(from, text);

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({from, text});
    });

})