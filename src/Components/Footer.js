import React from 'react'
import { Grid } from '@mui/material';

function Footer() {
    return (
        <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} textAlign={'center'} sx={{ background: 'linear-gradient(to bottom, rgba(58, 69, 219, 0.758), rgb(20, 20, 133))', padding: '25px', marginBottom: '10px', color: 'white' }} >
                © 2023 • All Rights Reserved
            </Grid>
        </Grid>
    )
}

export default Footer