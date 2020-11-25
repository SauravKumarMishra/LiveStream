import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

interface IProps {
  title: string;
  content: string;
  actions: {};
  onDismiss: any;
}

const ShowModal: React.FC<IProps> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  const insertEl = document.getElementById('modal');
  if (!insertEl) {
    return <div>No div found</div>;
  }
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss}>
      <Modal
        onClick={(e) => e.stopPropagation()}
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>{props.title}</h2>
            <p id='transition-modal-description'>{props.content}</p>
            {props.actions}
          </div>
        </Fade>
      </Modal>
    </div>,
    insertEl
  );
};

export default ShowModal;
