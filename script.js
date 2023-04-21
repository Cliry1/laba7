const https = require('https');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


readline.question('Введіть валютний код криптовалюти(у форматі: eth-ethereum):', (currencyCode) => {



  const url = `https://api.coinpaprika.com/v1/coins/${currencyCode}`;

  https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
          data += chunk;
      });
      res.on('end', () => {
          const crypto = JSON.parse(data);
          console.log(`Ім'я криптовалюти': ${crypto.name}`);
          console.log(`Символ: ${crypto.symbol}`);
          console.log(`Опис: ${crypto.description}`);
      });
  }).on('error', (err) => {
      console.log('Помилка: ' + err.message);
  });
  readline.close();
});
