import React, { useState } from 'react';
import './../styles/sidebar.scss';
import MenuIcon from './../assets/menuIcon.png';
import { SidebarSection } from './sidebarSection';

interface SidebarProps {
  onModeChange: (mode: string) => void;
  onToggle: (theme: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onModeChange, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modes = ['4x3', '5x4', '6x4'];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <img className='sidebar-toggle-img' src={MenuIcon} alt="Menu Icon" />
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <h2>Game Settings</h2>
          <SidebarSection
            title="Mode"
            options={modes.map((mode) => ({
              label: mode,
              onClick: () => onModeChange(mode),
            }))}
          />
          <SidebarSection
            title="Theme"
            options={[
              {
                label: 'Halloween',
                onClick: () => onToggle('halloween'),
              },
              {
                label: 'Christmas',
                onClick: () => onToggle('christmas'),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
