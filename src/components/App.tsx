import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {BrowserRouter as Router, Switch, Route, Link, BrowserRouter} from "react-router-dom";

import Home from '../pages/Home'
import PostList from '../pages/PostList'
import PostDetail from '../pages/PostDetail'

const drawerWidth = 240;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

export default function App(props: Props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    // this is the drawer in left side with all menu buttons
    const drawer = (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                <ListItem button component={Link} key={"Home"} to={"/"}>
                    <ListItemIcon>
                        <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Home"}/>
                </ListItem>
                <ListItem button component={Link} key={"Post List"} to={"/posts"}>
                    <ListItemIcon>
                        <LibraryBooksIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Posts List"}/>
                </ListItem>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <BrowserRouter>
            <Router>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <AppBar
                        position="fixed"
                        sx={{
                            width: {sm: `calc(100% - ${drawerWidth}px)`},
                            ml: {sm: `${drawerWidth}px`},
                        }}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{mr: 2, display: {sm: 'none'}}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                Assessment Of Manjula Dangalla
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box
                        component="nav"
                        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                        aria-label="mailbox folders"
                    >
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: {xs: 'block', sm: 'none'},
                                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                            }}
                        >
                            {drawer}
                        </Drawer>
                        <Drawer
                            variant="permanent"
                            sx={{
                                display: {xs: 'none', sm: 'block'},
                                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                            }}
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Box>
                    <Box
                        component="main"
                        sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
                    >
                        <Toolbar/>
                        <Switch>
                            <Route exact={true} path="/" component={Home}></Route>
                            <Route exact={true} path="/posts" component={PostList}></Route>
                            <Route exact={true} path="/posts/:id" component={PostDetail}></Route>
                        </Switch>
                    </Box>
                </Box>
            </Router>
        </BrowserRouter>
    );
}

