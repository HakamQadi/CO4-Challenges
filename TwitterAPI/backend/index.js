// // const Twitter = require('twitter');
// const { twitterClient, twitterBearer } = require('./twitterClient')
// // const CronJob = require("cron").CronJob;
// const express = require('express');
// // const { twitterClient } = require('./twitterClient');
// const app = express()


// const tweet = async () => {
//     try {
//         await twitterClient.v2.tweet('hello')
//     } catch (e) {
//         console.log(e)
//     }
// }


// const search = async () => {
//     const whereTakenTweets = await twitterBearer.v2.search('#WhereTaken There were');
//     console.log(whereTakenTweets)
//     for await (const tweet of whereTakenTweets) {
//         console.log(tweet);
//     }
// }

// // tweet()
// search()

// app.get('/', (req, res) => {
//     tweet()
//     res.send("Done")
// })

// const cronTweet = new CronJob("30 * * * * *", async () => {
//     tweet();
// });

// cronTweet.start();





const express = require('express')
const cors = require('cors')
const app = express()
const { twitterClient } = require("./twitterClient.js")


app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.listen(8080, () => {
    console.log(`Listening on port http://localhost:8080`)
})


app.post('/', (req, res) => {
    try {
        const data = req.body.tweet;
        // tweet(data)
        twitterClient.v2.tweet(data);
        // res.send(data)
        // console.log(data)
    } catch (error) {
        console.log(error)
    }
})

// const cronTweet = new CronJob("30 * * * * *", async () => {
//     tweet();
//     index++;
// });

// cronTweet.start();

// const search = async () => {
//     const whereTakenTweets = await twitterBearer.v2.search('#WhereTaken There were');

//     for await (const tweet of whereTakenTweets) {
//         console.log(tweet);
//     }
// }

// const like = async () => {
//     const whereTakenTweets = await twitterBearer.v2.search('#Worldle');

//     for await (const tweet of whereTakenTweets) {
//         await twitterClient.v2.like('1678423091272118272', tweet.id);
//     }
// }



// tweet()
// search()
// like()




// const cronTweet = new CronJob("30 * * * * *", async () => {
//     tweet();
// });

// cronTweet.start();


























// app.listen(8080, () => {
//     console.log('Listening on http://127.0.0.1:8080')
// })



// // const client = new Twitter({
// //     appKey: 'rUsOK7nSLHZYge8m24KJjmcL4',
// //     appSecret: 'tqT0iFW3vElEDWAikQVlKjtoHFmunvFisa3Fgia9o0ejZqPtRX',
// //     accessToken: '1678423091272118272-pz1hckJH9psXRMXqYhYyUDIfLtVLE3',
// //     accessSecret: 'sYwktrUTQJ6EKzkDXuyl55pE0AHQGBD5q5ysWgHYWlY3w'
// // });


// // var client = new Twitter({
// //     consumer_key: 'rUsOK7nSLHZYge8m24KJjmcL4',
// //     consumer_secret: 'tqT0iFW3vElEDWAikQVlKjtoHFmunvFisa3Fgia9o0ejZqPtRX',
// //     access_token_key: '1678423091272118272',
// //     access_token_secret: 'sYwktrUTQJ6EKzkDXuyl55pE0AHQGBD5q5ysWgHYWlY3w'
// // });

// // var params = { screen_name: 'HakamQadi0' };
// // client.get('statuses/user_timeline', params, function (error, tweets, response) {
// //     if (!error) {
// //         console.log(tweets);
// //     }
// //     else {
// //         console.log("errrrrror");
// //     }
// // });


// // client.post('statuses/update', { status: 'I Love Twitter' }, function (error, tweet, response) {
// //     if (error) throw error;
// //     console.log(tweet);  // Tweet body.
// //     console.log(response);  // Raw response object.
// // });





