import React from 'react';
import { Formik } from 'formik';
import { Button, TextField } from '@material-ui/core';

interface IProps {
  onSubmit: (data: any) => void;
  initialValues: any;
}

const StreamForm: React.FC<IProps> = (props) => {
  return (
    <div
      style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}
    >
      <Formik
        initialValues={props.initialValues}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          props.onSubmit(data);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              name='streamName'
              placeholder='Stream Name'
              value={values.streamName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <br />
            <TextField
              name='streamDescription'
              placeholder='Stream Description'
              value={values.streamDescription}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <br />
            <Button type='submit'>Submit</Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default StreamForm;
