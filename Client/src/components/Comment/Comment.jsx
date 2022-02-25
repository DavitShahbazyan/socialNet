import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Tooltip,
    Typography
} from '@mui/material'
import React from 'react'

export default function Comment({ comment }) {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Tooltip title={comment.commentsByName}>
                        <Avatar alt={comment.commentsByName} src="/static/images/avatar/2.jpg" />
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
