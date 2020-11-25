import React from 'react';
import { useDispatch } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamCreate: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const onSubmit = (data: any) => {
    dispatch(createStream(data));
  };
  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Create a new Stream</h3>
      <StreamForm
        initialValues={{ streamName: '', streamDescription: '' }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default StreamCreate;
