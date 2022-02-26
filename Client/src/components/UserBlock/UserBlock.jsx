import React from 'react';
import { Avatar, Badge, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export default function UserBlock({ user }) {
    return (
        <ListItem button key={user.id}>
            <ListItemIcon>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    style={{ marginRight: 10 }}
                    variant="dot"
                >
                    <Avatar alt={user.firstName + " " + user.lastName} src={user.avatar} />
                </StyledBadge>
            </ListItemIcon>
            <ListItemText secondary={user.firstName + " " + user.lastName} style={{ fontSize: 14 }} />
        </ListItem>
    )
}
