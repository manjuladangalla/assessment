import Typography from "@mui/material/Typography";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import React from "react";

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
        Home
    </Typography>,
];

export default function Home() {
    return (
        <Stack spacing={2}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <Typography paragraph>
                This is the assessment for Lizard Global Technical Test - Software Engineer. Please click "Post List" menu to see
                all posts from mock API.
            </Typography>
        </Stack>

    );
}