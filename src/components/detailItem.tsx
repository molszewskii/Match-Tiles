import React from 'react';

interface DetailItemProps {
  icon: string;
  label: string;
  value: React.ReactNode;
}

export const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => {
  return (
    <div className="detail-item">
      <img src={icon} alt={label} className="detail-icon" />
      <div className="detail-info">
        <span className="detail-label">{label}:</span>
        <span className="detail-value">{value}</span>
      </div>
    </div>
  );
};
