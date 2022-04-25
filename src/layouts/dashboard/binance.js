import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink ,useNavigate,usena} from 'react-router-dom';
import { styled } from '@mui/material/styles';
//import {useNavigation} from '@react-navigation/native';

// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
import bin from '../../assets/img/binance-coin-bnb-logo-freelogovectors.net_.png'
import qr from '../../assets/img/téléchargement.png'
import { height } from '@mui/system';
//import { replace } from 'lodash';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/dashboard'
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: '/dashboard/profile'
  },
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: '#'
  }
];
const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });

// ----------------------------------------------------------------------

export default function Binance() {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onlogout=  ()=>{
    localStorage.removeItem("authToken")
    localStorage.removeItem("idUser")
    sessionStorage.clear();
    
    navigate('/login',{reset: true});
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
       
       <ImageSrc style={{ backgroundImage: `url(${bin})` }} />
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 300 ,height :300 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
           you can donate via crypto (btc )
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            you only need to scan qr code and then choose your donation amount ,we really apreciate your support
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
         donate via bitcoin network BSC
        <ImageSrc style={{ backgroundImage: `url(${qr})` }}  />

        
      </MenuPopover>
    </>
  );
}
