import React, { useState, useEffect } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux'
import { update_conversation_style } from '../actions/conversationStyleAction';


function ConversationStrategy() {
    // conversation style 1 : remind user to ask next question
    // conversation style 2 : generate a new question to ask user
    const dispatch = useDispatch()
    const { conversation_style } = useSelector(state => state.conversationStyleState)

    const set_conversation_style=(new_conversation_style)=>{
        dispatch(update_conversation_style(new_conversation_style))
    }

    return (
        <div>
            <FormControl className='d-flex flex-column justify-content-center'>
                <FormLabel>Conversation Strategy</FormLabel>
                <RadioGroup
                    row
                >
                    <FormControlLabel value="1" control={<Radio checked={conversation_style===1}/>} label="First style" onChange={() => set_conversation_style(1)} />
                    <FormControlLabel value="2" control={<Radio checked={conversation_style===2}/>} label="Second style" onChange={() => set_conversation_style(2)} />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default ConversationStrategy


