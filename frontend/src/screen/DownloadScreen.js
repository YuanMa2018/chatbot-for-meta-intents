import React from 'react'
import { Button } from '@mui/material'
import { downloadInteractionTrack } from '../actions/inteactionTrackActions'
import axios from 'axios';


function DownloadScreen() {
    const downSubmit = () => {
        axios({
            url: '/api/interactions/download', 
            method: 'get',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'interactions.csv'); 
            document.body.appendChild(link);
            link.click();
        });
    }
    return (
        <div>
            <div>Download Screen</div>
            <Button className="mt-2 mb-4" size="small" variant="outlined" onClick={() => {
                console.log("first")
                downSubmit()
            }}>
                Download
            </Button>
        </div>
    )
}

export default DownloadScreen





