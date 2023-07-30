import axios from 'axios';
import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import profile_img from './profile.png';

function App() {
  const [dataToServer, setDataServer] = useState('');
  const [tweets, setTweets] = useState([]);

  const sendData = async () => {
    try {
      // await axios.post('http://127.0.0.1:8080', { tweet: dataToServer });
      // setDataServer('');

      await axios.post('http://127.0.0.1:8080', { tweet: dataToServer });
      setTweets(prevTweets => [...prevTweets, dataToServer]);
      setDataServer('');
    } catch (error) {
      console.log(error);
    }
  };

  function getValue(e) {
    // const value = e.target.value
    setDataServer(e.target.value)
    // setTweets(value)

  }

  return (
    <div className="App">
      <div className="tweet-container">
        <div className="d-flex gap-2">
          <img alt='' src={profile_img} style={{ borderRadius: '50%', width: "50px", height: "50px" }}></img>
          <textarea onChange={getValue} value={dataToServer} placeholder="What's happening?"></textarea>
        </div>
        <div className='actions'>
          <button id='btn' onClick={sendData}>Tweet</button>
          <span className="char-count">140</span>
        </div>
        <hr />
        {/* <h3>My Tweets</h3> */}
        {/* {tweets.length > 0 ? (
          tweets.map((tweet, index) => (
            <div key={index}>{tweet}</div>
          ))
        ) : (
          <div>No tweets yet.</div>
        )} */}
      </div>
    </div>
  );
}

export default App;