import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Chatpage = () => {
   

  return (
    <div>
        {chats.map((chat) => (
            <div key={chat._id} >{chat.chatName}</div>
        ))}
    </div>
  )
}

export default Chatpage