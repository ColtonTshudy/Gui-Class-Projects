/*
 * author: Colton Tshudy
 * version: 4/29/2023
 */

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from "react-router-dom";

export default function MediaCard({ title, index }) {
    return (
        <Card sx={{ maxWidth: 150 }}>
            <CardMedia
                sx={{ height: 150, width: 150 }}
                image="http://via.placeholder.com/150x150"
                title={`${title} picture`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <NavLink to={`/projects/${index}`} >{title}</NavLink>
                </Typography>
                <Typography gutterBottom variant="p " component="div">
                    <NavLink to={`/projects/${index}`} >{`${title} description`}</NavLink>
                </Typography>
            </CardContent>
        </Card>
    );
}