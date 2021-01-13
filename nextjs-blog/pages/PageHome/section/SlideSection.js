import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import styles from './SlideSection.style.js';


const useStyles = makeStyles(styles);
const images = [
    'https://static.boredpanda.com/blog/wp-content/uploads/2019/01/5-5c52344bd6620__880.jpg',
    'https://static.boredpanda.com/blog/wp-content/uploads/2019/01/10-Photos-That-Will-Make-You-Look-Up-At-The-Sky-More-Often-5c52379f09921__880.jpg',
    'https://i.pinimg.com/564x/f3/35/2e/f3352e0460586ca2c948c76c0a015f02.jpg',
];

export default function SlideSection() {
    const classes = useStyles();
    const [count, setCount] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            if (count === images.length - 1) {
                setCount(0);
            } else {
                setCount(count + 1);
            }
        }, 3000);
    })

    return (
        <Box>
            <Box className={classes.imageSection}>
                <img className='backImage' src={images[count]} alt='배경이미지'></img>
                <Box className={classes.title}>
                    <Typography variant='h3'>세상의 모든 자유여행 상품 비교</Typography>
                    <Typography variant='h4'>더 쉽게, 더 즐겁게 떠나는 자유여행</Typography>
                </Box>
            </Box>
        </Box>
    )
}