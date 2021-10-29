import React, {useEffect, useState} from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Avatar, Button, CardActions, CardHeader, Chip, Grid, ListItem, Paper, Skeleton} from '@mui/material';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
    const [filter, setFilter] = useState<string>("");

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

    const doFilter = (filter: string) => {
        setFilter(filter)
    }

    return (
        <Stack spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {breadcrumbs}
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={2}>
                    <FormControl variant="standard" sx={{m: 1, minWidth: 200}}>
                        <InputLabel id="category-filter">Filter by category</InputLabel>
                        <Select
                            labelId="category-filter"
                            id="category-filter-select"
                            value={filter}
                            onChange={e => {
                                doFilter(e.target.value)
                            }}
                            label="Filter by category"
                        >
                            <MenuItem value=""><em>Please select the category</em></MenuItem>
                            <MenuItem value="Surveys and Forms"><em>Surveys and Forms</em></MenuItem>
                            <MenuItem value="Digital Marketing"><em>Digital Marketing</em></MenuItem>
                            <MenuItem value="Platform News and Updates"><em>Platform News and Updates</em></MenuItem>
                            <MenuItem value="Tips and Best Practise"><em>Tips and Best Practise</em></MenuItem>

                        </Select>
                    </FormControl>
                </Grid>

            </Grid>

            {posts.length > 0 ? (
                <div>
                    {posts.filter((value) => {
                        console.log(filter)
                        if (filter === "") {
                            return value;
                        } else {
                            let return_value = null;
                            value.categories.map((category: any) => {
                                if (category.name === filter) {
                                    console.log(category.name)
                                    console.log(value)
                                    return_value = value;
                                }
                            });
                            return return_value
                        }

                    }).slice(0, visible).map((post, index) => (
                        <Card key={post.id} sx={{marginBottom: 1}}>
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
                            <CardActions>
                                <Button size={'small'} href={'/posts/' + post.id}>
                                    See More
                                </Button>
                            </CardActions>
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
