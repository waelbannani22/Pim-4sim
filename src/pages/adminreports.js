import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { mockImgAvatar } from '../utils/mockImages';
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// material
import {
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
    TablePagination,
    Chip,
    TextField
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'student', label: 'Student', alignRight: false },
    { id: 'motif', label: 'motif', alignRight: false },
    { id: 'classe', label: 'classe', alignRight: false },

    { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function AdminReport() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [selectedId, setSelectedId] = useState([]);
    const [isopen, setisopen] = useState(false);
    const [motif, setmotif] = useState('');
   const toggleModalmotif=() =>{
        setisopen(!isopen)
      
      }
    const navigate = useNavigate();

    const add = async () => {
        try {
            
            var list = [];
            var config2 = {
                method: 'post',
                url: 'http://localhost:5000/api/exercice/allreports',
                headers: {
                    'Content-Type': 'application/json',

                },
               


            };
            await axios(config2)
                .then(function (response1) {
                    var i = 1;
                    var result = response1.data.data
                    setTeachers(result)
                    const userss = result.map((e) => ({
                        id: e._id,
                        name: e.idteacher,
                        
                        email: e.emailS,
                        classe:e.class,
                        motif: e.motif



                    }));
                    //console.log(userss)
                    setUsers(userss)
                })
                .catch(function (error) {
                    console.log(error);
                });
            //console.log(data);
        } catch (error) {
            console.log("failure")
        }
    }

    useEffect(() => {
        add()

    }, [])



    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };
    const handleSelectId = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {

        setPage(newPage);

    };

    const click = () => {
        console.log(users)
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const disable = (id) => {
        console.log(id)
    };


    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };
    //accept 
    const accept = async (id) => {
        try {
            var data = {
                "idTeacher": id
            }
            var config2 = {
                method: 'post',
                url: 'http://localhost:5000/admin/acceptTeacher',
                headers: {
                    'Content-Type': 'application/json',

                },
                data: data

            };
            axios(config2)
                .then(function (response1) {

                    alert(response1.data.data)
                    window.location.reload()
                    // console.log("users",re)
                })
                .catch(function (error) {
                    console.log(error);
                });



            //console.log(data);
        } catch (error) {
            console.log("failure")
        }
    }
    //decline
    const decline = async (id) => {
        try {
            var data = {
                "idTeacher": id
            }
            var config2 = {
                method: 'post',
                url: 'http://localhost:5000/admin/refuseTeacher',
                headers: {
                    'Content-Type': 'application/json',

                },
                data: data

            };
            axios(config2)
                .then(function (response1) {

                    alert(response1.data.data)
                    window.location.reload()
                    // console.log("users",re)
                })
                .catch(function (error) {
                    console.log(error);
                });



            //console.log(data);
        } catch (error) {
            console.log("failure")
        }
    }
    //decline
    const report = async () => {
        try {
            var data = {
                "idteacher": sessionStorage.getItem("id"),
                "classe": sessionStorage.getItem("class"),
                "emailStudent": selectedId,
                "motif": motif
            }
            var config2 = {
                method: 'post',
                url: 'http://localhost:5000/api/exercice/addreport',
                headers: {
                    'Content-Type': 'application/json',

                },
                data: data

            };
            axios(config2)
                .then(function (response1) {

                    alert("Student reported ")
                    setisopen(!isopen)
                   // window.location.reload()
                    // console.log("users",re)
                })
                .catch(function (error) {
                    console.log(error);
                });



            //console.log(data);
        } catch (error) {
            console.log("failure")
        }
    }
    var b;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

    const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;
    //

    //  <TableCell align="left">

    //                           <Stack direction="row" alignItems="center" spacing={2}>
    //                             <Button variant="contained" color="success" onClick={() => accept(id)} disabled={row.status == "accepted"||row.status =="refused"?true:false}>
    //                               Accept
    //                             </Button>

    //                           </Stack>


    //                         </TableCell>

    // 
    function sendname(nb) {
        var name = nb
        var data = JSON.stringify({
            "data": name
        });

        var config = {
            method: 'post',
            url: 'http://localhost:5000/getname',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)

            .then(function (response) {
                console.log(response);
                navigate('/dashboard/Compilator', { replace: true })
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <Page title="User | Minimal-UI">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                   

                </Stack>

                <Card>
                    <UserListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={users.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const { id, name,email, classe, motif, avatarUrl, status, phone } = row;
                                            const isItemSelected = selected.indexOf(id) !== -1;

                                            return (
                                                <TableRow
                                                    hover
                                                    key={id}
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                    selected={isItemSelected}
                                                    aria-checked={isItemSelected}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={isItemSelected}
                                                            onChange={(event) => handleClick(event, id)}
                                                        />
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" padding="none" onClick={() => sendname(name)}>
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            
                                                            <Typography variant="subtitle2" noWrap>
                                                                {name}
                                                            </Typography>
                                                        </Stack>
                                                    </TableCell>
                                                    <TableCell align="left">{email}</TableCell>
                                                    <TableCell align="left">{motif}</TableCell>
                                                    <TableCell align="left">{classe}</TableCell>
                                                  



                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                {isUserNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
                <div>
                  <Dialog open={isopen} onClose={()=>toggleModalmotif()}>
                    <DialogTitle>update the lesson</DialogTitle>
                    <DialogContent>
                      <DialogContentText>Please insert your motif</DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="motif"
                        type="text"
                        fullWidth
                        
                        variant="standard"
                        onChange={(e) => setmotif(e.target.value)}
                      />
                    
                      
                      
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={toggleModalmotif}>Cancel</Button>
                      <Button onClick={(e)=> report()}>add</Button>
                    </DialogActions>
                  </Dialog>
                </div>
            </Container>
        </Page>
    );
}
