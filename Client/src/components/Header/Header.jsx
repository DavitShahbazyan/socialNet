
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Box } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { IconButton, Typography, Badge, MenuItem, Menu } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import { Tooltip } from '@mui/material';
import authService from './../../api/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { logountAction } from '../../actions';
import { ButtonBase } from '@mui/material';
import LanguageSelect from '../LanguageSelect/LanguageSelect';
import { useTranslation } from 'react-i18next';
import Searchbar from '../Searchbar/Searchbar';

const Header = () => {
    const { t } = useTranslation();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user } = useSelector(state => state.authentication);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        dispatch(logountAction());
        authService.logout();
        handleCloseUserMenu();
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Link to="/home" style={{ color: '#fff' }}>
                        <ButtonBase size="large" color="inherit">
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                Social Network
                            </Typography>
                        </ButtonBase>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <div style={{ marginTop: 5 }}>
                            <Searchbar />
                        </div>
                        <div style={{ marginTop: 2 }}>
                            <LanguageSelect />
                        </div>
                        <IconButton size="large" color="inherit" onClick={() => navigate('/chat')}>
                            <Badge color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <Tooltip title={t("open_Settings")}>
                            <IconButton
                                size="large"
                                onClick={handleOpenUserMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={() => {
                                handleCloseUserMenu();
                                navigate(`/profile/${user.id}`);
                            }}>
                                <Typography textAlign="center">{t("profile")}</Typography>
                            </MenuItem>

                            <MenuItem onClick={logout}>
                                <Typography textAlign="center">{t("logout")}</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box >
    );
}

export default Header;