import React, {useEffect, useState} from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Avatar, Button, CardActions, CardHeader, Chip, Grid, Skeleton} from '@mui/material';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const queryParams = new URLSearchParams(window.location.search)

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

const PostList = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [visible, setVisible] = useState<number>(10);
    const [categoriesList, setCategoryList] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>("")

    if (queryParams.get("filter") !== null || queryParams.get("filter") !== ""){
        console.log(queryParams.get("filter"))
        if (filter !== queryParams.get("filter")) {
            // @ts-ignore
            setFilter(queryParams.get("filter"))
        }
    }

    // get data from api
    useEffect(() => {
        fetch('/api/posts')
            .then((res) => res.json())
            .then((json) => setPosts(json.posts))
            .catch((err) => console.log(err))
    }, []);

    // show more function that add 10 for previous data count
    const showMorePost = async () => {
        setVisible((prevValue) => prevValue + 10)
    }

    const doFilter = async (filter: string) => {
        const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?filter=${filter}`;
        window.history.pushState({path:newUrl},'',newUrl);
        setFilter(filter)
    }

    const addCategories = async (categories: any[]) => {
        categories.map((category: any) => {
            const index = categoriesList.indexOf(category.name)
            if(index <= -1){
                setCategoryList([...categoriesList, category.name]);
            }
            return categoriesList
        });
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
                        <InputLabel key={"category-filter"}>Filter by category</InputLabel>
                        <Select
                            labelId="category-filter"
                            id="category-filter-select"
                            value={(filter !== null) ? filter : ""}
                            onChange={e => {
                                doFilter(e.target.value)
                            }}
                            label="Filter by category"
                        >
                            <MenuItem value=""><em>Please select the category</em></MenuItem>
                            { categoriesList.map((category) => {
                                return <MenuItem key={category} value={category}><em>{category}</em></MenuItem>
                            })}

                        </Select>
                    </FormControl>
                </Grid>

            </Grid>

            { posts.length > 0 ? (
                <div>
                    { posts.filter((value) => {
                        addCategories(value.categories).then(() => {})
                        if (filter === null || filter === "") {
                            return value;
                        } else {
                            let return_value = null;
                            value.categories.map((category: any) => {
                                if (category.name === filter) {
                                    return_value = value;
                                }
                            });
                            return return_value
                        }

                    }).slice(0, visible).map((post, index) => (
                            <Card key={post.id} sx={{marginBottom: 1}}>
                            <CardHeader
                                key = {`card-header-${post.id}`}
                                avatar={
                                    <Avatar aria-label="recipe">
                                        <img src={post.author.avatar} alt={'avatar'}/>
                                    </Avatar>
                                }
                                title={post.title}
                                subheader={post.author.name + " - " + new Date(post.publishDate).toLocaleString()}
                            />
                            <CardContent key = {`card-content-${post.id}`}>
                                <Typography paragraph={true} key = {`card-content-typography-${post.id}-1`}>
                                    {post.summary}
                                </Typography>
                                <Typography key = {`card-content-typography-${post.id}-2`}>
                                    {post.categories.map((data: any) => {
                                        return (
                                            <Chip key = {data.id} label={data.name} size="small" variant="outlined" color={'primary'}/>
                                        );
                                    })}
                                </Typography>
                            </CardContent>
                            <CardActions key = {`card-content-action-${post.id}`}>
                                <Button key = {`card-content-action-button-${post.id}-1`} size={'small'} href={'/posts/' + post.id}>
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
