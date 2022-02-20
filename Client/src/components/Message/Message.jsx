import { Avatar, Grid, Paper, Tooltip, Typography } from '@mui/material'
import React from 'react'

export default function Message() {
    return (
        <Paper elevation={1} style={{ padding: "15px", margin: '20px 0 20px' }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Tooltip title="Remy Sharp">
                        <Avatar alt="Remy Sharp" src={'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} />
                    </Tooltip>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <Typography variant='h6'>Michel Michel</Typography>
                    <Typography variant='body2' align="left">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                        Suspendisse congue vulputate lobortis. Pellentesque at interdum
                        tortor
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}
