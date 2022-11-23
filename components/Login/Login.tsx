import React, { useState } from 'react'
import Image from 'next/image'
import styles from '../../styles/Login.module.scss'
import LoginCover from '../../public/images/LoginCover.png'
import Logo from '../../public/images/Logo.svg'
import {
    Button,
    TextField,
    Grid,
    Link
} from '@mui/material';


export default function Login() {
    const [fieldValues, setFieldValues] = useState({
        email: '',
        password: '',
    })
    const handleChange = (name: string, value: string) => {
        setFieldValues((prevFieldValues) => {
            return {
                ...prevFieldValues,
                [name]: value,
            }
        });
    }
    const handleSubmit = () => {

    }
    return (
        <div className={styles.logincontainer}>
            <div className={styles.rightsection}>
                <Image src={Logo} alt={''} />
                <p className={styles.title}>You are hopping to the</p>
                <span className={styles.transformdivwrraper}><p className={styles.transformText}>right place</p></span>
                <div className={styles.loginform}>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item>
                                <TextField
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    sx={{
                                        width: '450px'
                                    }}
                                    variant="outlined"
                                    value={fieldValues.email}
                                    onChange={(event) => handleChange(event.target.name, event.target.value)}
                                    required
                                    autoFocus
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    sx={{
                                        width: '450px'
                                    }}
                                    variant="outlined"
                                    value={fieldValues.password}
                                    onChange={(event) => handleChange(event.target.name, event.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="button-block"
                                    sx={{
                                        background: '#FFFFFF',
                                        border: '1px solid #000000',
                                        width: '450px',
                                        boxShadow: '4px 4px 0px #70FFC3',
                                        borderRadius: '4px',
                                        color: '#000',
                                        '&:hover': {
                                            backgroundColor: '#70FFC3',
                                          },
                                    }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    <p>
                        By logining, I agree to the <Link>Terms of Service</Link> and
                        <br /><Link> Privacy Policy</Link>
                    </p>
                </div>
            </div>
            <div className={styles.leftsection}>
                <Image className={styles.imgcover} src={LoginCover} alt={''} />
            </div>
        </div>
    )
}
