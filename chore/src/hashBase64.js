const crypto = require('crypto');

const baseEncodeTables = {
    26: 'abcdefghijklmnopqrstuvwxyz',
    32: '123456789abcdefghjkmnpqrstuvwxyz', // no 0lio
    36: '0123456789abcdefghijklmnopqrstuvwxyz',
    49: 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ', // no lIO
    52: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    58: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ', // no 0lIO
    62: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    64: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_',
};

function encodeBufferToBase(buffer, base) {
    console.log('buffer',buffer)
    const encodeTable = baseEncodeTables[base];
    if (!encodeTable) {
        throw new Error('Unknown encoding base' + base);
    }

    const readLength = buffer.length;
    const Big = require('big.js');

    Big.RM = Big.DP = 0;
    let b = new Big(0);

    for (let i = readLength - 1; i >= 0; i--) {
        b = b.times(256).plus(buffer[i]);
    }

    let output = '';
    while (b.gt(0)) {
        output = encodeTable[b.mod(base)] + output;
        b = b.div(base);
    }

    Big.DP = 20;
    Big.RM = 1;

    return output;
}

//fixtures/modules/ylvfeng/index.css colorWhite //1C_3_Y83kln_LIVNkIOrYj
const data = 'fixtures/modules/ylvfeng/index.css\x00colorWhite'
const hash = crypto.createHash('md4').update(data)
const cn = encodeBufferToBase(hash.digest(),64)
console.log(cn);
