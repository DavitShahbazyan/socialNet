import React, { useState, memo } from 'react';
import {
    styled,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
    Paper,
    Tooltip,
    Badge
} from '@mui/material';
// Icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import Comment from './../Comment/Comment';
import AddComment from './../AddComment/AddComment';
import List from '@mui/material/List';


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

    const handleLike = () => {

    }

    return (
        <Paper elevation={5} sx={{ width: '80%', marginBottom: '50px', borderRadius: 3 }}>
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
                title={data.createdBy}
                subheader={data.createdDate}
            />
            <CardMedia
                component="img"
                height="500"
                image={data.imgUrl}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {data.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton size="large" onClick={handleLike}>
                    <Tooltip title={data.likes?.length ? data.likes : ''}>
                        <Badge badgeContent={data.likes?.length} color="error" >
                            <FavoriteIcon color='action' />
                        </Badge>
                    </Tooltip>
                </IconButton>
                <ExpandMore onClick={handleExpandClick} >
                    <CommentIcon />
                </ExpandMore>

            </CardActions>
            <div style={{ borderBottom: '1px solid #ccc', margin: '0 24px -1px' }} />

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {data.comments.map((comment, i) => {
                            return <Comment key={i} comment={comment} />
                        })}
                    </List>
                    <AddComment />
                </CardContent>
            </Collapse>
        </Paper>
    );
}

export default memo(Post);