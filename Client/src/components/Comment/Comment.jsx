import { Avatar, Grid, Paper, Tooltip, Typography } from '@mui/material'
import React from 'react'

export default function Comment({ comment }) {
    return (
        <Paper elevation={1} style={{ padding: "15px", margin: '20px 0 20px' }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Tooltip title={comment.commentsByName}>
                        <Avatar alt={comment.commentsByName[0]} />
                    </Tooltip>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <Typography variant='h6'>{comment.commentsByName}</Typography>
                    <Typography variant='body2' align="left">
                        {comment.content}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}
