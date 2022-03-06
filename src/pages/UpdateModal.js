import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {TextField} from '@mui/material';
import { Icon } from '@iconify/react';
import {ImageUpload} from '../pages';





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const style2 ={
  overflow:'scroll'
}

export default function UploadModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  
  return (
    <div align='end'>
      <Button variant="contained" onClick={handleOpen}>Update</Button>
      <Modal
        sx={style2}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <TextField
            fullWidth
            autoComplete="lesson name"
            type="text"
            label="lesson name"
          />
          <TextField
            fullWidth
            autoComplete="description"
            type="text"
            label="description"
          />
          <ImageUpload/>
          
          <Button
            fullWidth
            size="large"
            type="submit"
            variant="contained"
        //    onClick={}
        
          >
            Save Update
          </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
