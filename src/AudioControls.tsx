import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { IconButton, Slider } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { VolumeDown, VolumeUp, PlayArrowOutlined, PauseOutlined, SkipNextOutlined, SkipPreviousOutlined } from '@material-ui/icons';

const AudioControls = ({
  readyToPlay,
  isPlaying,
  trackProgress,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}: {
  readyToPlay: boolean,
  isPlaying: boolean,
  trackProgress: number,
  onPlayPauseClick: Function,
  onPrevClick: Function,
  onNextClick: Function,
}) => {

  const renderPlayPauseButton = () => {
    if (readyToPlay && isPlaying) {
      return <PauseOutlined fontSize='large' />
    } else if (readyToPlay && !isPlaying) {
      return <PlayArrowOutlined fontSize='large' />
    } else {
      return <CircularProgress color="secondary" />
    }
  }

  const playPauseHandler = () => {
    if (readyToPlay) {
      onPlayPauseClick(!isPlaying);
    }
  }

  return (
    <div>
      <IconButton onClick={() => { onPrevClick() }} color="secondary" aria-label="previous track">
        <SkipPreviousOutlined fontSize='large' />
      </IconButton>
      <IconButton onClick={playPauseHandler} color="secondary" aria-label="play">
        {renderPlayPauseButton()}
      </IconButton>
      <IconButton onClick={() => { onNextClick() }} color="secondary" aria-label="next track">
        <SkipNextOutlined fontSize='large' />
      </IconButton>
      <Slider value={trackProgress} onChangeCommitted={() => { console.log('TODO: scrub') }} color="secondary" aria-labelledby="scrub track" />
    </div>
  );
}

export default AudioControls;