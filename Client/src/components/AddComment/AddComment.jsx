import React, { useState } from 'react';
import {
    Paper, InputBase,
    Divider,
    IconButton,
    Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import authService from '../../api/auth.service';
import { getAllPostsSuccessAction } from '../../actions';
import { useTranslation } from 'react-i18next';

export default function AddComment({ postId }) {
    const { t } = useTranslation();
    const [content, setContent] = useState('');
    const { user } = useSelector(state => state.authentication);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        authService.addComment({
            commentsById: user.id,
            commentsByName: `${user.firstName} ${user.lastName}`,
            content,
            id: Date.now(),
            postId
        }).then(res => {
            if (res.data.posts) {
                dispatch(getAllPostsSuccessAction(res.data.posts));
                setContent('')
            }
        })
    }

    return (
        <Paper
            elevation={1}
            sx={{ p: '10px', display: 'flex', alignItems: 'center' }}
        >
            <Avatar
                alt={`${user.firstName} ${user.lastName}`}
                src={user.avatar}
            />

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={t("add_comments")}
                inputProps={{ 'aria-label': 'search google maps' }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <IconButton sx={{ p: '10px' }} onClick={handleSubmit} disabled={!content}>
                <AddIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
    )
}
