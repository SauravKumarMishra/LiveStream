import { Button } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

const KEY = `${process.env.REACT_APP_GOOGLE_AUTH_KEY}`;

declare global {
  interface Window {
    gapi: any;
  }
}

const GoogleAuth = (props: any) => {
  let auth: any = useRef(null);

  const { signIn, signOut } = props;
  //const [isSignedIn, setIsSignedIn] = useState(null);
  useEffect(() => {
    const onAuthChange = (isSignedIn: boolean) => {
      if (isSignedIn) {
        signIn(auth.current.currentUser.get().getId());
      } else {
        signOut();
      }
    };

    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: KEY,
          scope: 'email',
        })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();
          //setIsSignedIn(auth.current.isSignedIn.get());
          onAuthChange(auth.current.isSignedIn.get());
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });
  }, [signIn, signOut]);

  // const onAuthChange = () => {
  //   setIsSignedIn(auth.current.isSignedIn.get());
  // };

  const onSignInClick = () => {
    auth.current.signIn();
  };

  const onSignOutClick = () => {
    auth.current.signOut();
  };

  const renderAuthButton = () => {
    if (props.isSignedIn === null) {
      return null;
    } else if (props.isSignedIn) {
      return <Button onClick={() => onSignOutClick()}>Sign Out</Button>;
    }
    return <Button onClick={() => onSignInClick()}>Sign In</Button>;
  };

  return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state: any) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
