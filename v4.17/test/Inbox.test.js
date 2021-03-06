const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

//instantiate web3 on local ganache provider
const web3 = new Web3(ganache.provider());
//hook into the compiled Inbox code. Remember to compile first!
const {interface, bytecode} = require('../compile');


//let accounts; // need not be global?
let inbox;

beforeEach(async () => {
    //load the ganache test accounts
    accounts = await web3.eth.getAccounts();
    //use first account to deploy the contract on
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments:['Hi there!']})
        .send({from: accounts[0], gas: '1000000'})
});

describe('Inbox', () => {

    
    it('prints the contract', () => { console.log(inbox); });

    it('has an address', () => { assert.ok(inbox.options.address)});

    it('initializes with a message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!')
    });

    it('can setMessage', async () => {
        await inbox.methods.setMessage('set').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'set');
    });

});