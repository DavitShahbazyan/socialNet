import React, { useState, useEffect } from 'react'
import { IconButton, Paper, Avatar, InputBase, Divider, Input, Tooltip } from '@mui/material';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import authService from '../../api/auth.service';
import { getAllPostsSuccessAction } from '../../actions';

const getBase64 = (file) => new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject('Error: ', error);
})

export default function AddPosts() {
    const [content, setContent] = useState('');
    const [img, setImg] = useState('');
    const [imgName, setImgName] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const { user } = useSelector(state => state.authentication);

    const dispatch = useDispatch();

    useEffect(() => {
        if (img && content) {
            setBtnDisabled(true)
        } else {
            setBtnDisabled(false)
        }
    }, [img, content])

    const uploadImageFn = (e) => {
        setImgName(e.target.value);
        let file = e.target.files[0];
        getBase64(file).then(res => {
            setImg(res);
        })
    }

    const addPosts = async () => {
        const data = {
            imgUrl: img,
            content,
            createdBy: `${user.firstName} ${user.lastName}`,
            createdById: `${user.id}`,
            createdDate: moment().format('MMMM YYYY, h:mm:ss')
        }
        const response = await authService.createPosts(data);
        if (response.data.posts) {
            dispatch(getAllPostsSuccessAction(response.data.posts));
            setContent('')
            setImg('')
        }
    }

    return (
        <Paper
            elevation={5}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '80%', margin: '20px 0 50px' }}
        >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <Avatar src={user.avatar} />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={`"what's_new" ${user.firstName}`}
                value={content}
                onChange={(e) => { setContent(e.target.value) }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Tooltip title={imgName}>
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" hidden onChange={uploadImageFn} />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <AddToPhotosIcon />
                    </IconButton>
                </label>
            </Tooltip>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" disabled={!btnDisabled} onClick={addPosts}>
                <SendIcon />
            </IconButton>
        </Paper>
    )
}
