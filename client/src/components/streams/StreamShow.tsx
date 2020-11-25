import FlvJs from 'flv.js';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStream } from '../../actions';

const VideoPlayer: React.FC<any> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const player = FlvJs.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${props.id}.flv`,
    });
    player.attachMediaElement(videoRef.current as HTMLVideoElement);
    player.load();

    return () => {
      player.destroy();
    };
  }, [props.id]);

  return <video ref={videoRef} style={{ width: '100%' }} controls />;
};

const StreamDetails: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  const stream = useSelector((state: any) => state.streams[props.id]);

  useEffect(() => {
    dispatch(fetchStream(props.id));
  }, [dispatch, props.id]);

  if (!stream) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{stream.streamName}</h1>
      <h5>{stream.streamDescription}</h5>
    </div>
  );
};

const StreamShow: React.FC<any> = (props) => {
  const { id } = props.match.params;

  return (
    <div>
      <VideoPlayer id={id} />
      <StreamDetails id={id} />
    </div>
  );
};

export default StreamShow;

//if (videoRef.current) {
