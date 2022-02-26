import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener } from '@mui/material';
import Iconify from '../Iconify/Iconify';
import Search from '@mui/icons-material/Search';
import SearchIcon from '@mui/icons-material/Search';


const SearchbarStyle = styled('div')(({ theme }) => ({
    top: 0,
    right: 0,
    zIndex: 99,
    width: '100%',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    height: 64,
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    padding: theme.spacing(0, 3),
    backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
    [theme.breakpoints.up('md')]: {
        height: 64,
        padding: theme.spacing(0, 5)
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


export default function Searchbar() {
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <div>
                {!isOpen && (
                    <IconButton onClick={handleOpen} color="inherit">
                        <Search >
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                        </Search>
                    </IconButton>
                )}

                <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
                    <SearchbarStyle>
                        <Input
                            autoFocus
                            fullWidth
                            disableUnderline
                            placeholder="Search…"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Iconify
                                        icon="eva:search-fill"
                                        sx={{ color: 'text.disabled', width: 20, height: 20 }}
                                    />
                                </InputAdornment>
                            }
                            sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
                        />
                        <Button variant="contained" onClick={handleClose}>
                            Search
                        </Button>
                    </SearchbarStyle>
                </Slide>
            </div>
        </ClickAwayListener>
    );
}
