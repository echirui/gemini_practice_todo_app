import React from 'react';

interface TabsProps {
  activeTab: 'all' | 'active' | 'completed';
  onTabChange: (tab: 'all' | 'active' | 'completed') => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      <button
        className={activeTab === 'all' ? 'active' : ''}
        onClick={() => onTabChange('all')}
      >
        All
      </button>
      <button
        className={activeTab === 'active' ? 'active' : ''}
        onClick={() => onTabChange('active')}
      >
        Active
      </button>
      <button
        className={activeTab === 'completed' ? 'active' : ''}
        onClick={() => onTabChange('completed')}
      >
        Completed
      </button>
    </div>
  );
};

export default Tabs;
