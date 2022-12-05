import { Backdrop, Fade, Modal } from '@mui/material';

export const CustomModal = ({ open, close, layout }) => {
  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>{layout}</Fade>
    </Modal>
  );
};
