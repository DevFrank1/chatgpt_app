import React from 'react';
import './sidebar.css';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <NewChatButton />
        </div>
    )
}

export default Sidebar

const NewChatButton = () => {
    return (
        <Button
            sx={{
                borderColor: 'white',
                color: 'white',
                margin: '1rem 1rem',
                width: '100%',
                borderRadius: '25px'
            }}
            variant='outlined' startIcon={<AddIcon />}>
            New Chat
        </Button>
    )
}