import React from 'react';
import { Button } from './button';

interface SidebarSectionProps {
  title: string;
  options: Array<{
    label: string;
    onClick: () => void;
  }>;
}

export const SidebarSection: React.FC<SidebarSectionProps> = ({ title, options }) => {
  return (
    <div className="sidebar-section">
      <h3>{title}</h3>
      {options.map((option, index) => (
        <Button key={index} label={option.label} className="sidebar-button" onClick={option.onClick} />
      ))}
    </div>
  );
};
