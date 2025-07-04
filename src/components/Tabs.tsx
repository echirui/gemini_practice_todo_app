import React from 'react';

interface TabsProps {
  activeTab: 'all' | 'active' | 'completed';
  onTabChange: (tab: 'all' | 'active' | 'completed') => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div>
      <button onClick={() => onTabChange('all')} disabled={activeTab === 'all'}>All</button>
      <button onClick={() => onTabChange('active')} disabled={activeTab === 'active'}>Active</button>
      <button onClick={() => onTabChange('completed')} disabled={activeTab === 'completed'}>Completed</button>
    </div>
  );
};

export default Tabs;
