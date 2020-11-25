import {
  Avatar,
  Button,
  createStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

interface IProps {
  fetchStreams(): any;
  streams: any[];
  currentUserId: string;
  isSignedIn: boolean;
}

const StreamList = (props: IProps) => {
  const classes = useStyles();

  const { fetchStreams } = props;
  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  const renderAdmin = (stream: any) => {
    if (stream.userId === props.currentUserId) {
      return (
        <div>
          <Link to={`/streams/edit/${stream.id}`}>Edit</Link>
          <Button variant='outlined' color='secondary'>
            <Link
              to={`/streams/delete/${stream.id}`}
              style={{ textDecoration: 'none' }}
            >
              Delete
            </Link>
          </Button>
        </div>
      );
    }
  };

  const renderCreate = () => {
    if (props.isSignedIn) {
      return (
        <div>
          <Link to='/streams/new' style={{ textDecoration: 'none' }}>
            Create Stream
          </Link>
        </div>
      );
    }
  };

  const renderList = () => {
    return (
      <>
        <List className={classes.root} style={{ width: '100%' }}>
          {props.streams.map((stream: any) => (
            <React.Fragment key={stream.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Link
                      to={`/streams/${stream.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      {stream.streamName}
                    </Link>
                  }
                  secondary={stream.streamDescription}
                />
              </ListItem>
              {renderAdmin(stream)}
            </React.Fragment>
          ))}
        </List>
        {renderCreate()}
      </>
    );
  };
  return (
    <div
      style={{ display: 'flex', textAlign: 'center', justifyContent: 'center' }}
    >
      {renderList()}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
