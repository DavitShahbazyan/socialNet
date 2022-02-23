import React from 'react';
import { Avatar, ButtonBase, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

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
        <ButtonBase
            size="large"
            color="inherit"
            style={{
                width: '100%',
                textAlign: 'left',
                justifyContent: 'flex-start',
                marginBottom: 10
            }}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                style={{ marginRight: 10 }}
                variant="dot"
            >
                <Avatar sx={{ width: 30, height: 30 }} alt={user.firstName + " " + user.lastName} src={user.avatar} />
            </StyledBadge>
            {user.firstName + " " + user.lastName}
        </ButtonBase>
    )
}
