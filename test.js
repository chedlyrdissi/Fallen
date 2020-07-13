var fs = require('fs');
// const {Translate} = require('@google-cloud/translate').v2;
const translate = require("@vitalets/google-translate-api");

// read the data file
function readData(fileName){
    let dataRead = fs.readFileSync('./data/' + fileName + '.json');
    let infoRead = JSON.parse(dataRead);
    return infoRead;
}

// read the data file
function writeData(info, fileName){
    let data = JSON.stringify(info);
    fs.writeFileSync('./data/' + fileName + '.json', data);
}

async function translateTextAndInsert(article){
    var title = article.title;
    var body = article.body;
    var translated = 0;
    article.body = {};
    for(let lang of ['en', 'de']) {        
        translate(body, {to: lang}).then(res=>{
            article.body[lang] = res.text;
            translated++;
            if (translated === 2) {
                let data = readData('articles');
                data.push(article);
                writeData(data, 'articles');
            }
        });       
    }
}

translateTextAndInsert({
    "title": "article 1",
    "body": "body 1",
    "rank": "1",
    "game": "android 2",
    "id": "jeajkbvaa"
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// const articles = readData('articles-en');
// for(let art of articles) {
//     translateTextAndInsert(art);
//     sleep(2000);
// }