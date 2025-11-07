'use client'

import React, { useState, useRef, useEffect } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'

const API_BASE = 'http://localhost:5001/api'

interface Message {
  id: string
  text: string
  isUser: boolean
  sources?: any[]
}

const WelcomeCard = ({ icon, title, description, onClick }: any) => (
  <div 
    onClick={onClick}
    className="flex flex-col justify-center items-start gap-2 flex-1 px-4 py-4 rounded-xl bg-white hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
  >
    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary">
      {icon}
    </div>
    <div>
      <h3 className="text-neutral-800 font-sans text-sm font-semibold mb-1">
        {title}
      </h3>
      <p className="text-gray-600 font-sans text-xs leading-tight">
        {description}
      </p>
    </div>
  </div>
)

export default function ChatInterface() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await axios.post(`${API_BASE}/chat`, {
        question: inputValue,
      })

      if (response.data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response.data.answer,
          isUser: false,
          sources: response.data.sources,
        }
        setMessages(prev => [...prev, aiMessage])
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please make sure the backend server is running.',
        isUser: false,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt)
  }

  return (
    <div className="flex h-screen bg-primary overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 bg-primary">
          {/* Menu Toggle */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-opacity-80 transition-colors border-2 border-dashed border-gray-400"
              title="Click to open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12h18M3 6h18M3 18h18" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <h1 className="text-neutral-800 font-work text-xl font-semibold">
              Chatbot
            </h1>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search for..."
            className="h-[42px] px-4 rounded border border-neutral-500 bg-secondary text-sm outline-none"
            style={{ width: '352px' }}
          />

          {/* New Chat Button */}
          <button 
            onClick={() => setMessages([])}
            className="flex items-center justify-center gap-3 px-4 h-[42px] rounded bg-secondary hover:bg-opacity-80 transition-colors"
          >
            <span className="text-neutral-800 font-sans text-sm font-medium">
              New Chat
            </span>
          </button>
        </div>

        {/* Chat Area - Now fits perfectly on screen */}
        <div className="flex-1 flex items-center justify-center px-8 py-4 overflow-hidden">
          <div 
            className="flex flex-col justify-end items-center gap-5 bg-secondary rounded-3xl shadow-sm p-5 h-full max-h-[calc(100vh-120px)]"
            style={{
              width: 'min(1079px, 100%)',
            }}
          >
            {/* Messages or Welcome Screen */}
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full overflow-auto">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 mx-auto mb-3"></div>
                  <h2 className="text-neutral-800 font-work text-2xl font-semibold mb-2">
                    Welcome, Maya
                  </h2>
                  <p className="text-gray-600 font-sans text-sm">
                    Start by scripting a task, and let the chat take over.
                  </p>
                  <p className="text-gray-500 font-sans text-xs">
                    Not sure where to start?
                  </p>
                </div>

                {/* Quick Actions Grid - Smaller to fit screen */}
                <div className="grid grid-cols-3 gap-3 w-full max-w-3xl px-4">
                  <WelcomeCard
                    icon={<span className="text-xl">📊</span>}
                    title="Summarize Project"
                    description="Derive highlights from past partnerships."
                    onClick={() => handleQuickAction("Summarize the ERCOT project")}
                  />
                  <WelcomeCard
                    icon={<span className="text-xl">📝</span>}
                    title="PPT Generation"
                    description="Design custom visuals with AI."
                    onClick={() => handleQuickAction("Generate a presentation for the Brooklyn Navy Yard project")}
                  />
                  <WelcomeCard
                    icon={<span className="text-xl">🔍</span>}
                    title="Research"
                    description="Quickly gather and summarize info."
                    onClick={() => handleQuickAction("What were the key challenges in the Southeast projects?")}
                  />
                  <WelcomeCard
                    icon={<span className="text-xl">✍️</span>}
                    title="Generate Article"
                    description="Write articles on any topic instantly."
                    onClick={() => handleQuickAction("Tell me about market-to-market issues")}
                  />
                  <WelcomeCard
                    icon={<span className="text-xl">📈</span>}
                    title="Data Analytics"
                    description="Analyze data with AI-driven insights."
                    onClick={() => handleQuickAction("Analyze the NYISO bidding data")}
                  />
                  <WelcomeCard
                    icon={<span className="text-xl">💻</span>}
                    title="Code Explainer"
                    description="Explain code accurately & quickly."
                    onClick={() => handleQuickAction("Who was involved in the Fundamentals Meetings?")}
                  />
                </div>
              </div>
            ) : (
              <div className="flex-1 w-full overflow-y-auto px-4 space-y-4 scrollbar-thin">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] px-6 py-4 rounded-2xl ${
                        message.isUser
                          ? 'bg-white text-neutral-800 shadow-sm'
                          : 'bg-transparent text-neutral-800'
                      }`}
                    >
                      <p className="font-sans text-[15px] leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                      
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500 font-medium mb-2">Sources:</p>
                          {message.sources.slice(0, 3).map((source, idx) => (
                            <p key={idx} className="text-xs text-gray-600 mb-1">
                              {idx + 1}. {source.subject} ({source.project})
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-transparent px-6 py-4 rounded-2xl">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Box */}
            <div 
              className="flex flex-col justify-between items-start self-stretch bg-white rounded-[20px] border border-gray-200 p-4"
              style={{ height: '79px' }}
            >
              <div className="flex items-center gap-3 w-full">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0Z" fill="#7E89AC"/>
                  </svg>
                </button>

                <input
                  type="text"
                  placeholder="Write your message ..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 outline-none text-gray-700 font-sans text-[15px]"
                />

                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0Z" fill="#7E89AC"/>
                    </svg>
                  </button>
                  
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0Z" fill="#7E89AC"/>
                    </svg>
                  </button>

                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !inputValue.trim()}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2 10L18 2L10 18L8 10L2 10Z" fill="#081028"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
