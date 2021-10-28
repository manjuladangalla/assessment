import React, {useEffect, useState} from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Avatar, Button, CardActionArea, CardHeader, Skeleton} from '@mui/material';
import Divider from '@mui/material/Divider';

const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
        Lizard Global
    </Link>,
    <Link
        underline="hover"
        key="2"
        color="inherit"
        href="#"
    >
        Assessment
    </Link>,
    <Typography key="3" color="text.primary">
        Post List
    </Typography>,
];

function PostList() {
    const [posts, setPosts] = useState<any[]>([]);
    const [visible, setVisible] = useState<number>(10);
    const [categories, setCategory] = useState(null);

    // get data from api
    useEffect(() => {
        fetch('/api/posts')
            .then((res) => res.json())
            .then((json) => setPosts(json.posts))
            .catch((err) => console.log(err))
    }, []);

    // show more function that add 10 for previous data count
    const showMorePost = () => {
        setVisible((prevValue) => prevValue + 10)
    }

    return (
        <Stack spacing={2}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            {posts.length > 0 ? (
                <div>
                    <!-- map posts and loop through the posts and visible only 10-->
                    { posts.slice(0, visible).map( (post, index) => (
                            <Card key={post.id} sx={{ marginBottom: 1 }}>
                                <CardActionArea>
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe">
                                                <img src={post.author.avatar}/>
                                            </Avatar>
                                        }
                                        title={post.title}
                                        subheader={post.author.name + " - " + new Date(post.publishDate).toLocaleString()}
                                    />
                                    <CardContent>
                                        <Typography paragraph>
                                            {post.summary}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))
                    }
                    <Divider><Button variant="outlined" onClick={showMorePost}>Show more</Button></Divider>

                    </div>
            ) : (
                <Stack spacing={1}>
                    <Skeleton variant="text"/>
                    <Skeleton variant="text"/>
                    <Skeleton variant="rectangular" height={100}/>
                </Stack>
            )}
        </Stack>
    );
}

export default PostList
