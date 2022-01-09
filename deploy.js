const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// NB: Always use a test wallet for the seed phrase
// This one is on Firefox, to keep it separate

const provider = new HDWalletProvider(
    'basket baby present more finish eight certain amateur favorite brush chief inform',
    'https://rinkeby.infura.io/v3/beed8b415ef94c70adc6d787927f3b06'
    );

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Deploying from', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi there!']})
    .send({gas: '1000000', from: accounts[0]})

    console.log('Contract deployed to', result.options.address);

    provider.engine.stop();
};

deploy()