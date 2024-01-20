import React, { useRef, useState } from 'react';
import {
    TextField,
    Checkbox,
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Snackbar,
    Alert,
} from '@mui/material';
import Logos from 'components/atoms/logos';
import { useNavigate } from 'react-router-dom';
import { addUser, deleteUser, getUsers, updateUser } from '../services/api.services';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

interface IUser {
    id: number | undefined;
    userName: string;
    email: string;
    isActive: boolean;
}
const UserManagement = () => {
    const navigate = useNavigate();
    const ref = useRef<LoadingBarRef>(null)

    const textFieldStyle = {
        backgroundColor: '#5f5f5f29',
        borderRadius: '5px',
        width: '37%'
    };

    const [formData, setFormData] = useState<IUser>({
        id: undefined,
        userName: '',
        email: '',
        isActive: false,
    });

    const [userList, setUserList] = useState([]);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFail, setOpenFail] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenFail(false);
        setOpenInfo(false);
    };

    React.useEffect(() => {
        const userData = sessionStorage.getItem('userData');

        if (userData) {

            if (window.location.pathname === '/') {
                navigate('/usermanagement');
            }
        } else {
            navigate('/');
        }

        fetchUsers();
    }, [navigate, getUsers]);

    const fetchUsers = () => {
        getUsers().then((res) => {
            setUserList(res.data);
        })
    };
    const handleLogout = () => {
        sessionStorage.removeItem("userData");
        navigate('/');
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInputChange = (e:any) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: inputValue });
    };

    const handleAddUser = () => {
        if (formData.id) {
            setLoading(true);
            ref?.current?.continuousStart();
            updateUser({
                id: formData.id,
                userName: formData.userName,
                email: formData.email,
                isActive: formData.isActive
            }).then((res) => {
                if (res.success) {
                    fetchUsers();
                    setOpenInfo(true);
                    ref?.current?.complete();
                    setFormData({ id: undefined, userName: '', email: '', isActive: false });
                    return;
                }
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(true);
            ref?.current?.continuousStart();
            addUser({
                userName: formData.userName,
                email: formData.email,
                isActive: formData.isActive
            }).then((res) => {
                if (res.success) {
                    fetchUsers();
                    setOpenSuccess(true);
                    ref?.current?.complete();
                    setFormData({ id: undefined, userName: '', email: '', isActive: false });
                    return;
                }
            }).finally(() => {
                setLoading(false);
            });
            
        }
    };

    const handleEdit = (user: IUser) => {
        setFormData({
            id: user.id,
            userName: user.userName,
            email: user.email,
            isActive: user.isActive
        });
    };

    const handleDelete = (userId: number | undefined) => {
        ref?.current?.continuousStart();
        setLoading(true);
        deleteUser({
            id: userId
        }).then((res) => {
            if (res.success) {
                fetchUsers();
                setOpenFail(true);
                ref?.current?.complete();
                return;
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <main>
            <header className="pt-16 z-10 relative max-w-screen-lg xl:max-w-screen-xl mx-auto">
                <LoadingBar color='#9228fc' ref={ref} />
                <h3 className="text-2xl sm:text-4xl leading-none font-bold tracking-tight text-purple-200">
                    <span className="text-[gold] opacity-75">User Management</span> @ Admin System
                    <span className='ml-5'>
                        <Button
                            type="button"
                            variant="outlined"
                            color="error"
                            onClick={handleLogout}
                            disabled={loading}
                        >
                            <p className='font-bold'>Logout</p>
                        </Button>
                    </span>
                </h3>
                <h1 className="text-6xl lg:text-7xl leading-none font-extrabold tracking-tight mb-8 sm:mb-10 text-purple-400 mt-5">
                    {(JSON.parse(sessionStorage.getItem('userData') || '{}') as { userName?: string | null })?.userName || null}
                </h1>

                <div className="absolute top-12 right-12 opacity-10 lg:opacity-50">
                    <Logos.Vite className="w-56 h-56" />
                </div>
            </header>
            <Grid container direction="column" spacing={3} sx={{ paddingLeft: '17%' }} >
                <Grid item xs={6} style={{ width: '76%' }}>
                    <Paper elevation={3} style={{ padding: '20px', background: '#5f5f5f29' }}>
                        <form className='flex gap-5'>
                            <TextField
                                label="Username"

                                margin="normal"
                                name="userName"
                                value={formData.userName}
                                disabled={loading}
                                InputLabelProps={{
                                    style: { fontWeight: 'bold', color: 'yellow' },
                                }}
                                InputProps={{
                                    style: { fontWeight: 'light', color: '#C084FC' },
                                }}
                                style={textFieldStyle}
                                onChange={handleInputChange}
                            />
                            <TextField
                                label="Email"
                                margin="normal"
                                name="email"
                                value={formData.email}
                                disabled={loading}
                                InputLabelProps={{
                                    style: { fontWeight: 'bold', color: 'yellow' },
                                }}
                                InputProps={{
                                    style: { fontWeight: 'light', color: '#C084FC' },
                                }}
                                style={textFieldStyle}
                                onChange={handleInputChange}
                            />

                            <div className='flex justify-center items-center'>
                                <Checkbox
                                    name="isActive"
                                    size="medium"
                                    checked={formData.isActive}
                                    onChange={handleInputChange}
                                    disabled={loading}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: 'green',       // Set the color when checked
                                            '& .MuiSvgIcon-root': {
                                                borderColor: 'blue', // Set the color of the border
                                            },
                                        }
                                    }}
                                />
                                <p className='font-bold text-blue-500'>Is Active</p>
                            </div>

                            <div className='flex justify-center py-3 mt-1 w-30'>
                                <Button onClick={handleAddUser} variant="contained" color="secondary" disabled={loading} sx={{ width: "100%" }}>
                                    <p className='font-bold'>{formData.id!== null ? 'Update User' : 'Add User'}</p>
                                </Button>
                            </div>

                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={6} style={{ width: '76%' }}>
                    <Paper elevation={3} style={{ padding: '20px', background: '#5f5f5f29' }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><p className='font-extrabold text-purple-400 text-xl'>userName</p></TableCell>
                                        <TableCell><p className='font-extrabold text-purple-400 text-xl'>Email</p></TableCell>
                                        <TableCell><p className='font-extrabold text-purple-400 text-xl'>Status</p></TableCell>
                                        <TableCell><p className='font-extrabold text-purple-400 justify-center flex text-xl'>Actions</p></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody style={{ background: '#5f5f5f29' }}>
                                    {userList.map((user:IUser, index:number) => (
                                        <TableRow key={index} style={{
                                            backgroundColor: index % 2 === 0 ? '#5f5f5f3e' : 'transparent', // Change background colors
                                        }}>
                                            <TableCell><p className='font-bold text-slate-200'>{user.userName}</p></TableCell>
                                            <TableCell><p className='font-bold  text-slate-200'>{user.email}</p></TableCell>
                                            <TableCell>{user.isActive ? <p className='text-green-600 font-bold'>Active</p> : <p className='text-red-600 font-bold'>Disabled</p>}</TableCell>
                                            <TableCell>
                                                <div className='justify-center flex gap-5'>
                                                    <Button type="button" variant="contained" color="primary" disabled={loading} onClick={() => handleEdit(user)}><p className='font-bold'>Update</p></Button>
                                                    <Button type="button" variant="contained" color="error" disabled={loading} onClick={() => handleDelete(user.id)}><p className=' font-bold'>Delete</p></Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
            <div className="col-span-10">
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={openSuccess}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    sx={{ width: '30%' }}
                >
                    <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                        <p className="font-bold">User Added Successfully.</p>
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={openFail}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    sx={{ width: '30%' }}
                >
                    <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
                        <p className="font-bold">User deleted Successfully !</p>
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={openInfo}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    sx={{ width: '30%' }}
                >
                    <Alert onClose={handleClose} severity="info" variant="filled" sx={{ width: '100%' }}>
                        <p className="font-bold">User updated successfully.</p>
                    </Alert>
                </Snackbar>

            </div>
        </main>

    );
};

export default UserManagement;
