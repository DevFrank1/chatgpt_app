import React, { useState } from 'react';
import './chatscreen.css';

import TextField from '@mui/material/TextField';
import { Avatar, Box, Container, IconButton, Input, Skeleton, Typography } from '@mui/material';
import { borderRadius, display, height } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';

import ChatGPTIcon from '../../assets/chatgpt.png';

import { TypeAnimation } from 'react-type-animation';

const ChatScreen = () => {

    const [loading, setLoading] = useState(false);
    const [typing, setTyping] = useState(true);

    const [value, setValue] = useState('');
    const [chatLog, setChatLog] = useState([{
        user: 'gpt',
        message: 'How can I help you today?'
    },
    // {
    //     user: 'me',
    //     message: 'I want to use ChatGPT today.'
    // }
]);

    function clearChat() {
        setChatLog([]);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        let chatLogNew = [...chatLog, { user: 'me', message: `${value}` }]
        setValue('');
        setChatLog(chatLogNew);

        // fetch response from api

        const messages = chatLogNew.map((message) => message.message).join('\n');
        const response = await fetch('http://localhost:3010/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: messages,
            })
        })

        const data = await response.json();
        await setChatLog([...chatLogNew, {
            user: 'gpt',
            message: `${data.message}`
        }])
        await setLoading(false);
    }
    return (
        <div className='chatscreen'>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    overflowY: 'auto'
                }}>
                {chatLog.map((message, index) => (
                    <ChatItem key={index} message={message} setTyping={setTyping} typing={typing} />
                ))}
                {loading &&
                    <Container
                        disableGutters
                        sx={{
                            width: '100%',
                            // padding: '1rem',
                            borderRadius: '20px',
                        }}>
                        <Skeleton height={15} width="100%" sx={{
                            backgroundColor: 'rgba(50,50,50,1)',
                            // margin: '0rem',
                            marginBottom: '0.5rem',
                            borderRadius: '20px',
                        }}
                            variant="rounded" />
                    </Container>
                }
            </Box>
            <InputContainer value={value} setValue={setValue} handleSubmit={handleSubmit} clearChat={clearChat} />
        </div>
    )
}

export default ChatScreen

const ChatItem = ({ message, setTyping, typing }) => {
    return (
        <Container
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: '1rem',
                marginBottom: '0.5rem',
                backgroundColor: 'rgba(50,50,50,1)',
                borderRadius: '20px',
            }}>
            {
                message.user == 'gpt' ?
                    <Avatar src={ChatGPTIcon} />
                    : <Avatar />
            }
            <Box
                sx={{
                    width: '100%',
                    margin: '0 1rem',

                }}>
                <Typography>{message.user == 'gpt' ?
                    <TypeAnimation cursor={false} sequence={[`${message.message}`,1]} />
                    : message.message}</Typography>
            </Box>
        </Container>
    )
}


const InputContainer = ({ value, setValue, handleSubmit, clearChat }) => {
    return (
        <Input
            sx={{
                color: 'rgba(255,255,255, 1)',
                backgroundColor: 'rgba(50,50,50,1)',
                padding: '0.5rem 1.5rem',
                borderRadius: '20px',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: '1.5'
            }}
            placeholder='Type your answer...'
            value={value}
            disableUnderline
            fullWidth
            multiline
            onChange={(e) => {
                setValue(e.target.value)
            }}
            startAdornment={
                <IconButton
                    sx={{
                        marginLeft: '1rem',
                    }}
                    onClick={clearChat}>
                    <SendIcon sx={{
                        color: 'white'
                    }} />
                </IconButton>
            }
            endAdornment={
                <IconButton
                    sx={{
                        marginLeft: '1rem',
                    }}
                    onClick={handleSubmit}>
                    <SendIcon sx={{
                        color: 'white'
                    }} />
                </IconButton>
            }
        />
    )
}