import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function Comment({ comment }) {
    const { users } = useSelector(state => state.users);
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        users.forEach(user => {
            if (user.id === comment.commentsById) {
                setAvatar(user.avatar)
            }
        });
    }, [users])


    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Tooltip title={comment.commentsByName}>
                        <Avatar alt={comment.commentsByName} src={avatar} />
                    </Tooltip>
                </ListItemAvatar>
                <ListItemText
                    primary={<b>{comment.commentsByName}</b>}
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {comment.content}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}
