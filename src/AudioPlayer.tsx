import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import AudioControls from './AudioControls';

type Track = {
  title: string,
  artist?: string,
  audio: string,
  image?: string,
  color?: string
}

const useStyles = makeStyles({
  media: {
    height: 500,
    width: 500
  }
});

const AudioPlayer = ({ tracks }: { tracks: Track[] }) => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [readyToPlay, setReadyToPlay] = useState(false);
  const classes = useStyles();

  const { title, artist, color, image, audio } = tracks[trackIndex];

  const audioRef = useRef(new Audio(audio));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isReady = useRef(false);

  audioRef.current.addEventListener("canplaythrough", event => {
    setReadyToPlay(true);
  });

  const toPrevTrack = () => {
    if (trackIndex - 1 > 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  }

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  }

  const startTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    }, 100);
  }

  startTimer();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }
  }, []);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(audio);
    setTrackProgress(0);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIndex]);

  return (
    <div className='Audio-player'>
      <Card>
        <CardMedia
          className={classes.media}
          image={image}
        />
        <CardContent>
          <Typography variant='h3' gutterBottom>{title}</Typography>
          <Typography variant='h4' gutterBottom>{artist}</Typography>
          <AudioControls readyToPlay={readyToPlay} isPlaying={isPlaying} trackProgress={trackProgress} onPlayPauseClick={setIsPlaying} onPrevClick={toPrevTrack} onNextClick={toNextTrack} />
        </CardContent>
      </Card>
    </div>
  );
}

export default AudioPlayer;