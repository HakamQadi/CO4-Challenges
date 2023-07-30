const { TwitterApi } = require('twitter-api-v2')
const client = new TwitterApi({
    appKey: '6Nq1XqR4xJBHp2vXwIsff6C0Z',
    appSecret: 'InaagsfAJdhxQGiX0DGPLK6crgdtRi4QtVD1n0GeGfIH1ApJki',
    accessToken: '1678423091272118272-KFW5PCfywplC6euBjAoZ7Ug3rKHxra',
    accessSecret: '1WeombxWspPkNIq7eMjSY8clgTMXXIvbTGKA9sANNJk5b'
});

const bearer = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAAzgogEAAAAAYxKNjR3nnvSx0ekGhv8Gl91QoUU%3Dg4CagwC5EdG3VoGN7QVFMTR1vVXwm7jEl4eVKCGSY3FSjBLtRy')

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

module.exports = { twitterClient, twitterBearer }