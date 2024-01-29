import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function createData(name, weights, testRating, detail_options) {

    return {
        name,
        weights,
        testRating,
        detail_options
    };

}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    {row.detail_options?.length === 0
                        ? <div></div>
                        : <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>}

                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.weights}</TableCell>
                <TableCell align="center">{row.testRating}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>

                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    {row.detail_options?.map((one_detail_row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{one_detail_row.space_temp}</TableCell>
                                            <TableCell align="left" component="th" scope="row">
                                                {one_detail_row.detail_name}
                                            </TableCell>
                                            <TableCell align="left">{one_detail_row.rating}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


export default function AssessmentTable({ product }) {
    // # ---Assessment new---
    // # quality judgement 100 = basic function 30 + camera 20 + screen 15 + battery 15 + handling 15 + stability 5

    const BasicFuntion_detail = [
        {
            detail_name: "voice quality rating",
            space_temp: '',
            rating: product.voice_quality_rating,
        },
        {
            detail_name: "network sensitivity rating",
            space_temp: '',
            rating: product.network_sensitivity_rating,
        },
        {
            detail_name: "WLan connection rating",
            space_temp: '',
            rating: product.WLan_connection_rating,
        },
        {
            detail_name: "computing power rating",
            space_temp: '',
            rating: product.computing_power_rating,
        },
        {
            detail_name: "location rating",
            space_temp: '',
            rating: product.location_rating,
        },
    ]

    const Camera_detail = [
        {
            detail_name: "normal light photo rating",
            space_temp: '',
            rating: product.normal_light_photo_rating,
        },
        {
            detail_name: "low light photo rating",
            space_temp: '',
            rating: product.low_light_photo_rating,
        },
        {
            detail_name: "zoom photo rating",
            space_temp: '',
            rating: product.zoom_photo_rating,
        },
        {
            detail_name: "shutter lag rating",
            space_temp: '',
            rating: product.shutter_lag_rating,
        },
        {
            detail_name: "video rating",
            space_temp: '',
            rating: product.video_rating,
        },
        {
            detail_name: "selfie rating",
            space_temp: '',
            rating: product.selfie_rating,
        },
    ]

    const Battery_detail = [
        {
            detail_name: "charging time",
            space_temp: '',
            rating: product.charging_time_rating,
        },
        {
            detail_name: "using time",
            space_temp: '',
            rating: product.duration_rating,
        },
        {
            detail_name: "replaceable battery",
            space_temp: '',
            rating: product.replaceable_battery_rating,
        },
    ]

    const Handling_detail = [
        {
            detail_name: "instruction for use rating",
            space_temp: '',
            rating: product.instruction_for_use_rating,
        },
        {
            detail_name: "menu service rating",
            space_temp: '',
            rating: product.menu_service_rating,
        },
        {
            detail_name: "biometric unlock rating",
            space_temp: '',
            rating: product.biometric_unlock_rating,
        },
    ]

    const Stability_detail = [
        {
            detail_name: "drop test rating",
            space_temp: '',
            rating: product.drop_test_rating,
        },
        {
            detail_name: "scratch test rating",
            space_temp: '',
            rating: product.scratch_test_rating,
        },
        {
            detail_name: "rain test rating",
            space_temp: '',
            rating: product.rain_test_rating,
        },
        {
            detail_name: "immersion test rating",
            space_temp: '',
            rating: product.immersion_test_rating,
        },
        {
            detail_name: "folding test rating",
            space_temp: '',
            rating: product.folding_test_rating,
        }
    ]


    // # ---Assessment old---
    // # quality judgement 100 = Telefon 15 + Internet and pc 15 + camera 15 
    // + location navigation 10 + music player 5 + battery 15 + handling 15 + stability 5
    const Telefon_detail = [
        {
            detail_name: "voice quality rating",
            space_temp: '',
            rating: product.voice_quality_rating,
        },
        {
            detail_name: "network sensitivity rating",
            space_temp: '',
            rating: product.network_sensitivity_rating,
        },
        {
            detail_name: "sms rating",
            space_temp: '',
            rating: product.sms_rating,
        },
    ]

    const Internet_pc_rating_detail = [
        {
            detail_name: "surfing rating",
            space_temp: '',
            rating: product.surfing_rating,
        },
        {
            detail_name: "Email rating",
            space_temp: '',
            rating: product.E_mail_rating,
        },
        {
            detail_name: "backup to PC rating",
            space_temp: '',
            rating: product.backup_PC_rating,
        },
    ]

    const Handling_2_detail = [
        {
            detail_name: "instruction for use rating",
            space_temp: '',
            rating: product.instruction_for_use_rating,
        },
        {
            detail_name: "menu service rating",
            space_temp: '',
            rating: product.menu_service_rating,
        },
        {
            detail_name: "screen display rating",
            space_temp: '',
            rating: product.display_rating,
        },

        {
            detail_name: "transport rating",
            space_temp: '',
            rating: product.transport_rating,
        },

    ]



    const rows = product.display_score
        ? [
            createData('basic function', "30 %", product.Basic_function_rating + " (" + product.Basic_function_score + ")", BasicFuntion_detail),
            createData('camera', "20 %", product.camera_rating + " (" + product.camera_score + ")", Camera_detail),
            createData('screen', "15 %", product.display_rating + " (" + product.display_score + ")", []),
            createData('battery', "15 %", product.battery_rating + " (" + product.battery_score + ")", Battery_detail),
            createData('handling', "15 %", product.handling_rating + " (" + product.handling_score + ")", Handling_detail),
            createData('stability', "5 %", product.Stability_rating + " (" + product.Stability_score + ")", Stability_detail),
        ] : [
            createData('Telefon', "30 %", product.phone_rating + " (" + product.phone_score + ")", Telefon_detail),
            createData('Internet and pc', "20 %", product.internet_pc_rating + " (" + product.internet_pc_score + ")", Internet_pc_rating_detail),
            createData('camera', "15 %", product.camera_rating + " (" + product.camera_score + ")", Camera_detail),
            createData('location navigation', "15 %", product.location_navigation_rating + " (" + product.location_navigation_score + ")", []),
            createData('music player', "15 %", product.music_player_rating + " (" + product.music_player_score + ")", []),
            createData('battery', "5 %", product.battery_rating + " (" + product.battery_score + ")", []),
            createData('handling', "5 %", product.handling_rating + " (" + product.handling_score + ")", Handling_2_detail),
            createData('stability', "5 %", product.Stability_rating + " (" + product.Stability_score + ")", []),
        ];

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>{product.brand + " " + product.name}</TableCell>
                        <TableCell align="center">Weights: 100%</TableCell>
                        <TableCell align="center">Test rating: {product.total_rating + " (" + product.total_score + ")"}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
