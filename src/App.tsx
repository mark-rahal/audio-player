import React from 'react';
import AudioPlayer from './AudioPlayer';
import './App.css';

const App = () => {
  const tracks = [
    {
      title: 'test',
      artist: 'test_artist',
      audio: 'http://cld3097web.audiovideoweb.com/va90web25003/companions/Foundations%20of%20Rock/13.01.mp3',
      image: 'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/185531028/original/e946a1e85c535b3a8e4bf771cfb720080d86d8d0/draw-anyone-you-want-in-some-sick-art.png',
      color: ''
    },
    {
      title: 'test2',
      artist: 'test_artist2',
      audio: 'http://cld3097web.audiovideoweb.com/va90web25003/companions/Foundations%20of%20Rock/13.02.mp3',
      image: 'https://static-cse.canva.com/blob/141803/Brown-Illustrated-Coffee-Acoustic-Album-Cover.jpg',
      color: ''
    }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <AudioPlayer tracks={tracks}></AudioPlayer>
        </div>
      </header>
    </div>
  );
}

export default App;
