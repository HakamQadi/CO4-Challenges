const Twit = require('twit');


var T = new Twit({
    consumer_key: '7QrjmvRDKScgJEl6B8RE7Kpda',
    consumer_secret: 'ouZFhzyDdassXS5XDYPmtkOhMf6njCSh7nxiC7zTi3HnjVhv6L',
    access_token: '1678423091272118272-vP94A0d38f2uysyWcKgLLedKo6OKbv',
    access_token_secret: 'ph6rhwUOZnGGJCbshTN3M7u2JfFJPJS7CQs8aJ61aUJu1',
});
const hashtag = 'python'

async function scrapAndSend() {
    const { data } = await T.get("search/tweets", {
        q: '#nodejs, #Nodejs',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
        })
    console.log(data)
}

scrapAndSend()
