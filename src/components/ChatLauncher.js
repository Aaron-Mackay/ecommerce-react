import React, {useState} from "react";
import {Launcher} from "react-chat-window";

const ChatLauncher = () =>
{
    const greeting = "Hi! This is an automated customer support bot, here to help you with delivery tracking and refunds. What can we do for you?"
    const [messageList, setMessageList] = useState([{author: 'them', type: 'text', data: {text: greeting}}])
    
    const onMessageWasSent = (userMessage) =>
    {
        const autoMessage = getAutoMessage(userMessage.data.text)
        setMessageList(prevState => ([...prevState, userMessage, autoMessage]))
    }
    
    
    return (
            <Launcher
                    agentProfile={{
                        teamName: 'Customer Support',
                        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                    }}
                    messageList={messageList}
                    showEmoji
                    onMessageWasSent={onMessageWasSent}
            />
    );
}

export default ChatLauncher;

const getAutoMessage = (userMessage) =>
{
    const autoMessage = {author: 'them', type: 'text', data: {text: "I did not understand, could you try again?"}}
    if(userMessage.toLowerCase().includes("refund"))
    {
        autoMessage.data.text = "To begin the refund process, you can send a refund request through the orders page here."
    }
    else if(userMessage.toLowerCase().includes("delivery"))
    {
        autoMessage.data.text = "To check the estimated date of delivery, access the orders page here."
    }
    return autoMessage
}
