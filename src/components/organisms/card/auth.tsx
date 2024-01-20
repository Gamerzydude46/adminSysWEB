import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import React, { useRef } from "react";
import { useForm } from 'react-hook-form';
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { signIn, signUp, verifyOTP } from "../../../services/api.services";
import { useNavigate } from "react-router-dom";

interface ISignUpForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ISignInForm {
    username: string;
    email: string;
    password: string;
}

interface IOtpForm {
    otp: number;
}

const style = {
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#0a0a0a',
    border: '3px solid #117af3',
    boxShadow: 24,
    borderRadius: '8px',
    p: 4,
};

function Auth() {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const ref = useRef<LoadingBarRef>(null);
    const textFieldStyle = {
        backgroundColor: '#5f5f5f29',
        borderRadius: '5px',
    };

    const signInForm = useForm<ISignInForm>();
    const signUpForm = useForm<ISignUpForm>();
    const otpForm = useForm<IOtpForm>();

    React.useEffect(() => {
        const userDataString = sessionStorage.getItem('userData');
        if (userDataString) {

            if (window.location.pathname === '/') {
                navigate('/usermanagement');
            }
        } else {
            navigate('/');
        }
    }, [navigate]);

    const onSignIn = (data: ISignInForm) => {
        const payLoad = {
            userName: data.username,
            password: data.password,
        }

        signUpForm.reset();
        setLoading(true);
        ref?.current?.continuousStart();

        signIn(payLoad)
            .then((res) => {
                setLoading(false);
                ref?.current?.complete();

                if (res.success) {
                    handleOpenModal();
                    return;
                }

                setOpenFail(true);;
            })
            .catch((error) => {
                console.error('Error:', error);
                setOpenFail(true);
                setLoading(false);
                ref?.current?.complete();
            });

    };

    const onSignUp = (data: ISignUpForm) => {

        signInForm.reset();

        const payLoad = {
            userName: data.username,
            email: data.email,
            password: data.password,
            isActive: true
        }
        setLoading(true);
        ref?.current?.continuousStart();
        signUp(payLoad)
            .then((res) => {
                setLoading(false);
                ref?.current?.complete();

                if (res.success) {
                    setOpenSuccess(true);
                    signUpForm.reset();
                    return;
                }

                setOpenFail(true);;
            })
            .catch((error) => {
                debugger;
                console.error('Error:', error);
                setOpenInfo(true);
                setLoading(false);
                ref?.current?.complete();
            });
    };

    const onVerifyOtp = (data: IOtpForm) => {
        const payLoad = {
            userName: signInForm.getValues().username,
            enteredOtp: data.otp,
        }
        setLoading(true);
        ref?.current?.continuousStart();

        verifyOTP(payLoad)
            .then((res) => {
                setLoading(false);
                ref?.current?.complete();

                if (res.success) {
                    sessionStorage.setItem('userData', JSON.stringify(payLoad));
                    navigate('/usermanagement');
                    return;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                setOpen(true);
                setLoading(false);
                ref?.current?.complete();
            });

    };

    const [openSuccess, setOpenSuccess] = React.useState(false);
    const [openFail, setOpenFail] = React.useState(false);
    const [openInfo, setOpenInfo] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenFail(false);
        setOpenInfo(false);
        setOpen(false);
    };

    return (
        <section className="max-w-screen-lg xl:max-w-screen-xl mx-auto grid grid-cols-10 gap-4 pt-12">
            <LoadingBar color='#9228fc' ref={ref} />
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}
            <div className="col-span-10 sm:col-span-5 flex  bg-white bg-opacity-5 rounded-md shadow p-4 relative overflow-hidden h-full flex-col">
                <h3 className="text-2xl font-bold text-blue-500">Sign Up</h3>
                <div>
                    <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="text-gray-400">
                        <TextField
                            label="Username"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                style: { fontWeight: 'bold', color: '#C084FC' },
                            }}
                            InputProps={{
                                style: { fontWeight: 'light', color: 'yellow' },
                            }}
                            style={textFieldStyle}
                            {...signUpForm.register('username', { required: 'Username is required' })}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                style: { fontWeight: 'bold', color: '#C084FC' },
                            }}
                            InputProps={{
                                style: { fontWeight: 'light', color: 'yellow' },
                            }}
                            style={textFieldStyle}
                            {...signUpForm.register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        <TextField
                            type="password"
                            label="Password"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                style: { fontWeight: 'bold', color: '#C084FC' },
                            }}
                            InputProps={{
                                style: { fontWeight: 'light', color: 'yellow' },
                            }}
                            style={textFieldStyle}
                            {...signUpForm.register('password', { required: 'Password is required' })}
                        />
                        <TextField
                            type="password"
                            label="Confirm Password"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                style: { fontWeight: 'bold', color: '#C084FC' },
                            }}
                            InputProps={{
                                style: { fontWeight: 'light', color: 'yellow' },
                            }}
                            style={textFieldStyle}
                            error={!!signUpForm.formState.errors.confirmPassword}
                            helperText={signUpForm.formState.errors.confirmPassword?.message || ' '}
                            {...signUpForm.register('confirmPassword', {
                                required: 'Confirm Password is required',
                                validate: (value) => value === signUpForm.watch('password') || 'Passwords do not match',
                            })}
                        />
                        <div className="mt-2">
                            <Button type="submit" variant="contained" color="primary" className="font-bold">
                                <p className="font-bold text-yellow-400">Create Account</p>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-span-10 sm:col-span-5 flex  bg-white bg-opacity-5 rounded-md shadow p-4 relative overflow-hidden h-full flex-col">
                <h3 className="text-2xl font-bold text-blue-500">Sign In</h3>
                <div>
                    <form onSubmit={signInForm.handleSubmit(onSignIn)} className="text-gray-400">
                        <TextField
                            label="Username"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                style: { fontWeight: 'bold', color: '#C084FC' },
                            }}
                            InputProps={{
                                style: { fontWeight: 'light', color: 'yellow' },
                            }}
                            style={textFieldStyle}
                            {...signInForm.register('username', { required: 'Username is required' })}
                        />
                        <TextField
                            type="password"
                            label="Password"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                style: { fontWeight: 'bold', color: '#C084FC' },
                            }}
                            InputProps={{
                                style: { fontWeight: 'light', color: 'yellow' },
                            }}
                            style={textFieldStyle}
                            {...signInForm.register('password', { required: 'Password is required' })}
                        />
                        <div className="mt-2">
                            <Button type="submit" variant="contained" color="primary" className="font-bold">
                                <p className="font-bold text-yellow-400">Grant Access</p>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-span-10">
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={openSuccess}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    sx={{ width: '30%' }}
                >
                    <Alert onClose={handleClose} severity="success" variant="outlined" sx={{ width: '100%' }}>
                        <p className="font-bold">Admin account created successfully.</p>
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={openFail}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    sx={{ width: '30%' }}
                >
                    <Alert onClose={handleClose} severity="error" variant="outlined" sx={{ width: '100%' }}>
                        <p className="font-bold">Invalid username or password</p>
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={openInfo}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    sx={{ width: '30%' }}
                >
                    <Alert onClose={handleClose} severity="info" variant="outlined" sx={{ width: '100%' }}>
                        <p className="font-bold">Oops!User already exist.</p>
                    </Alert>
                </Snackbar>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    sx={{ width: '30%' }}
                >
                    <Alert onClose={handleClose} severity="warning" variant="outlined" sx={{ width: '100%' }}>
                        <p className="font-bold">Authentication Failed!</p>
                    </Alert>
                </Snackbar>
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={otpForm.handleSubmit(onVerifyOtp)}>
                        <div className="font-bold text-purple-400">
                            <div className="text-green-500 text-xl">Login successful:</div>
                            <div className="mt-2">Please Check your Email for OTP </div>
                        </div>
                        <TextField
                            type="number"
                            label="One-Time Password"
                            variant="filled"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                style: { fontWeight: 'bold', color: 'yellow' },
                            }}
                            InputProps={{
                                style: { fontWeight: 'light', color: '#C084FC' },
                            }}
                            style={textFieldStyle}
                            {...otpForm.register('otp', { required: 'OTP is required' })}
                        />
                        <Button type="submit" variant="contained" color="secondary" className="font-bold mt-2">
                            <p className="font-bold ">Authenticate</p>
                        </Button>
                    </form>

                </Box>
            </Modal>
        </section>
    );
}

export default Auth;


