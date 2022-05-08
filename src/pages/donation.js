// material
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import './stylep.css';


// components
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
import { useRef, useState } from 'react';
import bin from '../../src/assets/img/dollar-black-circle-icon-28.png'
import { ethers } from "ethers";
import ErrorMessage from "../ErrorMessage";
import { alpha } from '@mui/material/styles';
import TxList from "../TxList";
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuPopover from '../../src/components/MenuPopover';
//binance-coin-bnb-logo-freelogovectors.net_.png
// ----------------------------------------------------------------------
//<footer>
//<ErrorMessage message={error} />
//    <TxList txs={txs} />
//</footer>
var x = false;



const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    x = true;
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};


export default function PaymentWeb() {
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };
  if (x == true) {
    MySwal.fire({
      icon: 'success',
      title: 'Thank you For your donation',
      text: 'Payment successful',
    })
    x = false
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
        sx={{ width: 350 ,height :300 }}
      >
        <Page title="Dashboard | Minimal-UI">

          <section>
            <form className="m-4" onSubmit={handleSubmit}>
              <h1 >
                Donation :
              </h1>
              <div className="my-3">
                <input
                  type="text"
                  name="addr"
                  placeholder="Recipient Address"
                />
              </div>
              <div className="my-3">
                <input
                  name="ether"
                  type="text"
                  placeholder="Amount in Ethereum"
                />
              </div>
              <input
                type="submit"
                name="Pay Now"
                dis
              />
              <canvas id="canvas"></canvas>

            </form>
          </section>
        </Page>
        </MenuPopover>
      </>
      );
}
