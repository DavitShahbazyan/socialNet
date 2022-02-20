import React, { useEffect, useState } from 'react';
import {
    styled,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
    Paper,
    Grid,
    Tooltip
} from '@mui/material';
// Icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import Message from './../Message/Message';
import AddMessage from './../AddMessage/AddMessage';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Post = ({ data }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    useEffect(() => {
        console.log(data);
    }, [data])


    return (
        <Paper elevation={5} sx={{ maxWidth: '80%', marginBottom: '50px' }}>
            <CardHeader
                avatar={
                    <Tooltip title={data.createdBy}>
                        <Avatar aria-label="recipe">{data.createdBy.slice(0, 1)}</Avatar>
                    </Tooltip>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={data.title}
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="500"
                image={'https://picsum.photos/200/300'}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {data.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <ExpandMore
                    onClick={handleExpandClick}
                >
                    <CommentIcon />
                </ExpandMore>

            </CardActions>
            <div style={{ borderBottom: '1px solid #ccc', margin: '0 24px -1px' }} />

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Message />
                    <AddMessage />
                </CardContent>
            </Collapse>
        </Paper>
    );
}

export default Post;