import React from 'react';
import {
    Paper, InputBase,
    Divider,
    IconButton,
    Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


export default function AddMessage() {
    return (
        <Paper
            elevation={1}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >
            <IconButton sx={{ p: '10px' }}>
                <Avatar alt="Remy Sharp" src={'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'} />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Add Comments"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton sx={{ p: '10px' }}>
                <AddIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
    )
}
