import * as _ from 'lodash';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { editStream, fetchStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = (props: any) => {
  const dispatch = useDispatch();
  //const { fetchStream } = props;
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(fetchStream(id));
  }, [dispatch, id]);

  const onSubmit = (formValues: any) => {
    console.log(formValues);
    dispatch(editStream(props.match.params.id, formValues));
  };

  return (
    <div>
      {props.stream === 'undefined' ? (
        'Loading...'
      ) : (
        <div>
          <h3 style={{ textAlign: 'center' }}>Edit your Stream:</h3>
          <StreamForm
            initialValues={_.pick(
              props.stream,
              'streamName',
              'streamDescription'
            )}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps)(StreamEdit);
