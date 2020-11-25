import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStream, fetchStream } from '../../actions';
import history from '../../history';
import ShowModal from '../ShowModal';

const StreamDelete: React.FC<any> = (props) => {
  const actions = (
    <>
      <Button
        onClick={() => dispatch(deleteStream(props.match.params.id))}
        variant='contained'
        color='secondary'
      >
        Delete
      </Button>
      <Link to='/'>Cancel</Link>
    </>
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStream(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const stream = useSelector(
    (state: any) => state.streams[props.match.params.id]
  );

  const renderContent = () => {
    if (!stream) {
      return 'Are you sure you want to delete this stream?';
    }
    return `Are you sure you want to delete this stream with title: ${stream.title}`;
  };

  return (
    <ShowModal
      title='Delete Stream'
      content={renderContent()}
      actions={actions}
      onDismiss={() => history.push('/')}
    />
  );
};

export default StreamDelete;
