import React from 'react';
import Slider from "react-slick";
import { makeStyles, Paper, Avatar } from '@material-ui/core';
// import {} from '@material-ui/core';
// import { IoChevronForwardCircle, IoChevronBackCircleSharp } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ninja from '../../../../Images/Ninja.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: 'auto',
        // width: '60%',
        width: '98%',

        '& > *': {
            margin: theme.spacing(2),
            // width: theme.spacing(105),
            height: theme.spacing(13),

            [theme.breakpoints.up('xs')]: {
                width: '98%'
            },
        },
    },
    slider: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',

        '& > *': {
            margin: theme.spacing(2),
        },
    },

    pictures: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        border: 'double 4px #CBC8C8',
        margin: 'auto'

    },
}));
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", borderRadius: '50%', backgroundColor: '#dce0e6' }}
            onClick={onClick}
        />
    );
}
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", borderRadius: '50%', backgroundColor: '#dce0e6' }}
            onClick={onClick}
        />
    );
}



export default function Stories() {
    const classes = useStyles();
    var settings = {
        dots: false,
        infinite: false,
        speed: 800,
        slidesToShow: 8,
        slidesToScroll: 3,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 3,

                }
            },
            {
                breakpoint: 1070,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 3,

                }
            },
            {
                breakpoint: 966,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 380,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 289,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            },
        ]
    };
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} >

                <Slider className={classes.slider}  {...settings} >
                    <div><Avatar alt="Nazim" className={classes.pictures} src={ninja} />
                        <span  >Nazim</span>
                    </div>
                    <div><Avatar alt="Nazim" className={classes.pictures} src={ninja} /><span >Nazim</span> </div>
                    <div ><Avatar alt="Nazim" className={classes.pictures} src={ninja} /><span >Nazim</span>  </div>
                    <div ><Avatar alt="Nazim" className={classes.pictures} src={ninja} /><span >Nazim</span>  </div>
                    <div ><Avatar alt="Nazim" className={classes.pictures} src={ninja} /><span >Nazim</span>  </div>
                    <div ><Avatar alt="Nazim" className={classes.pictures} src={ninja} /><span >Nazim</span>  </div>
                    <div ><Avatar alt="Nazim" className={classes.pictures} src={ninja} /><span >Nazim</span>  </div>
                    <div ><Avatar alt="Nazim" className={classes.pictures} src={ninja} /><span >Nazim</span>  </div>
                    <div ><Avatar alt="Nazim" className={classes.pictures} src={ninja} /><span >Nazim</span>  </div>
                    <div ><Avatar alt="Nazim" className={classes.pictures} src={ninja} /><span >Nazim</span>  </div>
                    <div ><Avatar alt="Nazim" className={classes.pictures} src={ninja} /><span >Nazim</span>  </div>
                    <div ><Avatar alt="Nazim" className={classes.pictures} src={ninja} /><span >Nazim</span>  </div>
                </Slider>
            </Paper>

        </div>
    );
}
