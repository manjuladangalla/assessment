import React, {useEffect, useState} from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Avatar, CardActionArea, CardHeader, Chip, Grid, Skeleton} from '@mui/material';


function PostDetail(props: any) {
    const [post, setPost] = useState<any>(null);

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
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/posts"
        >
            Posts
        </Link>,
        <Typography key="3" color="text.primary">
            {post !== null ? (post.title) : ('')}
        </Typography>,

    ];

    // get data from api
    useEffect(() => {
        fetch('/api/posts/' + props.match.params.id )
            .then((res) => res.json())
            .then((json) => setPost(json))
            .catch((err) => console.log(err))
    }, []);

    return (
        <Stack spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </Grid>
            </Grid>

            {post !== null ? (
                <div>
                    <Card key={post.id} sx={{marginBottom: 1}}>
                        <CardActionArea>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe">
                                        <img src={post.author.avatar} alt={'avatar'}/>
                                    </Avatar>
                                }
                                title={post.title}
                                subheader={post.author.name + " - " + new Date(post.publishDate).toLocaleString()}
                            />
                            <CardContent>
                                <Typography paragraph>
                                    {post.summary}
                                </Typography>
                                <Typography>
                                    {post.categories.map((data: any) => {
                                        return (
                                            <Chip label={data.name} size="small" variant="outlined" color={'primary'}/>
                                        );
                                    })}
                                </Typography>
                            </CardContent>

                        </CardActionArea>
                    </Card>
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

export default PostDetail
