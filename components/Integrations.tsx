'use client'

import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Image from 'next/image'

interface Integration {
  id: string
  name: string
  logo: string
  description: string
  category: string
  connected: boolean
}

const integrations: Integration[] = [
  {
    id: 'teams',
    name: 'Microsoft Teams',
    logo: '/teams.png',
    description: 'Teams is integrates chat, video meetings for workplace communication.',
    category: 'Conversations',
    connected: false
  },
  {
    id: 'slack',
    name: 'Slack',
    logo: '/slack.png',
    description: 'Slack is a messaging platform that streamlines team communication.',
    category: 'Conversations',
    connected: false
  },
  {
    id: 'github',
    name: 'Github',
    logo: '/github.png',
    description: 'GitHub is a web-based platform for collaborative software development.',
    category: 'Coding',
    connected: true
  },
  {
    id: 'outlook',
    name: 'Outlook',
    logo: '/outlook.png',
    description: 'Outlook is an email and calendar management application by Microsoft',
    category: 'Conversations',
    connected: false
  },
  {
    id: 'powerpoint',
    name: 'Microsoft Powerpoint',
    logo: '/powerpoint.png',
    description: 'PowerPoint is a presentation software used to create slideshows',
    category: 'Documents & Recordings',
    connected: false
  },
  {
    id: 'excel',
    name: 'Microsoft Excel',
    logo: '/excel.png',
    description: 'Excel learns your patterns, organizing your data to save you time.',
    category: 'Documents & Recordings',
    connected: false
  }
]

const IntegrationCard = ({ integration }: { integration: Integration }) => {
  return (
    <div 
      className={`flex flex-col items-start gap-2 ${
        integration.connected ? 'bg-[#FFE2BF]' : 'bg-secondary'
      }`}
      style={{
        width: '100%',
        padding: '32px',
        borderRight: '1px solid #D4D4D8',
        borderBottom: '1px solid #D4D4D8',
        margin: 0,
        boxSizing: 'border-box'
      }}
    >
      {/* Logo */}
      <div style={{ width: '40px', height: '37px', aspectRatio: '40/37' }}>
        <Image 
          src={integration.logo} 
          alt={integration.name}
          width={40}
          height={37}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>

      {/* Name */}
      <h3 
        style={{
          color: '#18181B',
          fontFamily: 'Geist, sans-serif',
          fontSize: '18px',
          fontWeight: 500,
          marginTop: '8px'
        }}
      >
        {integration.name}
      </h3>

      {/* Description - 2 lines */}
      <p 
        style={{
          width: '264px',
          color: '#71717A',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '20px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {integration.description}
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-2 mt-4">
        <button 
          className={`flex items-center justify-center gap-[6px]`}
          style={{
            padding: '6px 12px',
            borderRadius: '375px',
            border: '0.75px solid #D4D4D8',
            backgroundColor: integration.connected ? '#000000' : '#FFF3E4',
            boxShadow: '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
          }}
        >
          <span 
            style={{
              color: integration.connected ? '#FFFFFF' : '#1E293B',
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 400
            }}
          >
            {integration.connected ? 'Connected' : 'Connect'}
          </span>
          {integration.connected && (
            <div 
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ color: 'white', fontSize: '10px' }}>✓</span>
            </div>
          )}
        </button>

        <button 
          className="flex items-center gap-1"
          style={{
            color: '#1E293B',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 400
          }}
        >
          Integrations details
          <span>→</span>
        </button>
      </div>
    </div>
  )
}

export default function Integrations() {
  const [activeItem, setActiveItem] = useState('Integrations')
  const [activeTab, setActiveTab] = useState('All Integrations')
  
  const categories = ['All Integrations', 'Conversations', 'Coding', 'Documents & Recordings']
  
  const getFilteredIntegrations = () => {
    if (activeTab === 'All Integrations') return integrations
    return integrations.filter(i => i.category === activeTab)
  }

  const filteredIntegrations = getFilteredIntegrations()

  return (
    <div className="flex h-screen bg-primary overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 bg-primary">
          <div>
            <h1 
              style={{
                color: '#18181B',
                fontFamily: 'Geist, sans-serif',
                fontSize: '36px',
                fontWeight: 600,
                letterSpacing: '-0.72px',
                marginBottom: '8px'
              }}
            >
              Integrations
            </h1>
            <p 
              style={{
                color: '#71717A',
                fontFamily: 'Geist, sans-serif',
                fontSize: '18px',
                fontWeight: 300,
                lineHeight: '22px',
                letterSpacing: '0.18px'
              }}
            >
              Select and connect tools you use to integrate with your KnowledgeVault
            </p>
          </div>

          {/* Toggle View */}
          <div 
            className="flex items-center gap-2"
            style={{
              padding: '2px',
              borderRadius: '500px',
              border: '1px solid #D4D4D8',
              backgroundColor: '#FFF'
            }}
          >
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="3" y="3" width="6" height="6" rx="1"/>
                <rect x="11" y="3" width="6" height="6" rx="1"/>
                <rect x="3" y="11" width="6" height="6" rx="1"/>
                <rect x="11" y="11" width="6" height="6" rx="1"/>
              </svg>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <rect x="3" y="4" width="14" height="2" rx="1"/>
                <rect x="3" y="9" width="14" height="2" rx="1"/>
                <rect x="3" y="14" width="14" height="2" rx="1"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8 pb-4 bg-primary">
          <div className="flex items-center gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`flex items-center gap-2 ${
                  activeTab === category ? 'bg-secondary' : 'hover:bg-secondary'
                }`}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  transition: 'background-color 0.2s'
                }}
              >
                <span 
                  style={{
                    color: '#18181B',
                    fontFamily: 'Geist, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400
                  }}
                >
                  {category}
                </span>
                {category === 'All Integrations' && (
                  <div 
                    style={{
                      display: 'flex',
                      width: '25px',
                      height: '25px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '500px',
                      backgroundColor: '#FFF',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                  >
                    6
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Integrations Grid - 3 columns, no gaps */}
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-primary">
          <div 
            className="grid grid-cols-3 gap-0"
            style={{
              maxWidth: '1100px',
              border: '1px solid #D4D4D8',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'grid'
            }}
          >
            {filteredIntegrations.map(integration => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>

          {/* Terms and Conditions */}
          <div className="mt-12 text-center">
            <a 
              href="#" 
              style={{
                color: '#71717A',
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                textDecoration: 'underline'
              }}
            >
              Read our terms and Conditions ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
