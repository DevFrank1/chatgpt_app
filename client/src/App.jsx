import { useState } from 'react'
import './App.css'
import ChatScreen from './components/chat/ChatScreen'
import Sidebar from './components/sidebar/Sidebar'

function App() {

  return (
    <div className="app">
      <Sidebar />
      <ChatScreen />
    </div>
  )
}

export default App
