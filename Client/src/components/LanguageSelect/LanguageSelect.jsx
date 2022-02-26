import React, { useRef, useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MenuPopover from '../MenuPopover/MenuPopover';
import LanguageIcon from '@mui/icons-material/Language';
import i18next from 'i18next';


const LANGS = [
    {
        value: 'ar',
        label: 'Հայերեն',
        icon: 'https://flagcdn.com/w20/am.png'
    },
    {
        value: 'en',
        label: 'English',
        icon: 'https://flagcdn.com/w20/us.png'
    },
    {
        value: 'ru',
        label: 'Русский',
        icon: 'https://flagcdn.com/w20/ru.png'
    },

];


export default function LanguagePopover() {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);


    const handleOpen = (e) => {
        setOpen(true);
    };

    const handleClose = (e) => {
        setOpen(false);
    };

    const changeLanguage = (event) => {
        const { value } = event.currentTarget.dataset;
        localStorage.setItem('i18nextLng', value);
        i18next.changeLanguage(value);
    }

    return (
        <>
            <IconButton
                ref={anchorRef}
                onClick={handleOpen}
                sx={{
                    padding: 0,
                    width: 44,
                    height: 44,
                    ...(open && {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
                    })
                }}
                color="inherit"
            >
                <LanguageIcon />
            </IconButton>

            <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} value={'sadas'}>
                <Box sx={{ py: 1 }}>
                    {LANGS.map((option) => (
                        <MenuItem
                            data-value={option.value}
                            key={option.value}
                            selected={false}
                            onClick={(e) => {
                                changeLanguage(e);
                                handleClose();
                            }}
                            sx={{ py: 1, px: 2.5 }}
                        >
                            <ListItemIcon>
                                <Box component="img" alt={option.label} src={option.icon} />
                            </ListItemIcon>
                            <ListItemText primaryTypographyProps={{ variant: 'body2' }} value={option.value}>
                                {option.label}
                            </ListItemText>
                        </MenuItem>
                    ))}
                </Box>
            </MenuPopover>
        </>
    );
}
