let userLogin = 'wojasz631';
let password = 'f7f78079';
let clientLogin = 'iaisystem';
let encrypt = (passw) => {
    let sha1 = require('sha1');
    let date = new Date();
    let dateYYYYMMDD = date.toISOString().slice(0,10).replace(/-/g,"");
    return sha1(dateYYYYMMDD + sha1(passw));
}
let ask = () => {
    let request = require('request');
    let fs = require('fs');
    let credentials = {"authenticate":{"userLogin":userLogin,"authenticateKey":encrypt(password)},"params":{"clients":[{"clientLogin":clientLogin}]}};
    request({
        method: 'POST',
        url: 'https://demo183-pl.iai-shop.com/api/?gate=orders/get/88/json',
        json: credentials,
    }, (error, response, body) => {
        if (error) console.log(error);
    }).pipe(fs.createWriteStream('./zamowienia.json'));
}
ask(); 