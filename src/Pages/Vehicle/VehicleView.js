import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { FooterIn, NormalHeaderBar } from '../../Components';
import { Grid, ThemeProvider, Typography, createTheme, responsiveFontSizes } from '@mui/material';
import { FormVehicleView } from '../../Components/Vehicle/index';
import axios from 'axios';
import { error } from '../../util/Toastify';

function VehicleView() {


    const { id } = useParams();

    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                // console.log(id);
                const response = await axios.get(`http://localhost:8080/api/auth/getVehicle?id=${id}`);
                setVehicle(response.data);
                setLoading(false);
            } catch (e) {
                error('Error fetching item:' + e);
                setLoading(true);
            }
        };

        fetchVehicle();
    }, [id]);


    let theme = createTheme();
    theme = responsiveFontSizes(theme);

    theme.typography.h5 = {
        fontSize: '1.1rem'
    }



    return (
        <div>

            <NormalHeaderBar />
            <Grid container spacing={2}>
                <Grid item position='fixed'>
                    <Link to={"/login/welcome/vehicleList"}>
                        <img src="https://cdn-icons-png.flaticon.com/128/3031/3031796.png" style={{ width: '40px', height: '40px', opacity: '0.6', margin: '5px' }} alt='Back' />
                    </Link>
                </Grid>
            </Grid>
            <Grid container className="text">
                <Grid item xl={12} lg={12} md={12} xs={12} sm={12} textAlign={'center'}>
                    <ThemeProvider theme={theme}>
                        <Typography variant='h3' sx={{ fontWeight: 'bold' }}>Vehicle Details</Typography>
                    </ThemeProvider>
                </Grid>
            </Grid>

            <Grid container>
                <ThemeProvider theme={theme}>
                    <Grid item xl={12} lg={12} md={12} xs={12} sm={12} textAlign={'center'}>
                        <Typography variant='h6' sx={{ marginTop: '-20px' }}>You can view vehicle details</Typography>
                    </Grid>
                </ThemeProvider>
            </Grid>

            <br />
            <Grid container textAlign='center' justifyContent='center'>
                {/* <Grid item xl={5.25} lg={4.65} md={3} xs={1} sm={2}></Grid> */}
                <Grid item xl={4} lg={5} md={4} xs={10.5} sm={6} className="box">
                    {loading ? (
                        <p>Loading...</p>
                    ) : vehicle ? (
                        <FormVehicleView vehicle={vehicle} />
                    ) : (
                        <p>Vehicle not found</p>
                    )}
                </Grid>
                {/* <Grid item xl={2} lg={3} md={3} xs={0.5} sm={2}></Grid> */}
            </Grid><br />
            <Grid container>
                <Grid item xl={12} lg={12} md={12} xs={12} sm={12} textAlign={'center'}>
                    <ThemeProvider theme={theme}>
                        <Typography variant='h5' fontWeight='bold'>
                            To dashboard?
                            <Link to={'/login/welcome'} style={{ color: 'red' }}>
                                Click here
                            </Link>
                        </Typography>
                    </ThemeProvider>
                </Grid>
            </Grid><br />
            <FooterIn />


        </div>
    )
}

export default VehicleView