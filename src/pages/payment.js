// material
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import './stylep.css';

import {
  Box,
  Grid,
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';
// components
import { Link as RouterLink } from 'react-router-dom';
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
import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "../ErrorMessage";
import TxList from "../TxList";

// ----------------------------------------------------------------------
//<footer>
//<ErrorMessage message={error} />
    //    <TxList txs={txs} />
  //</footer>
  var x =false ;
  

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
    x=true;
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};


export default function DashboardApp() {
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
  if (x==true)
  {
    MySwal.fire({
icon: 'success',
title :'Thank you For your donation',
text : 'Payment successful',
    })
    x=false
      }

  return (
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
  );
}
