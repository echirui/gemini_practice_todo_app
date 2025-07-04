import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Tabs from './Tabs';

describe('Tabs', () => {
  const mockOnTabChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(cleanup);

  it('renders all three tabs', () => {
    render(<Tabs activeTab="all" onTabChange={mockOnTabChange} />);

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument();
  });

  it('disables the active tab', () => {
    render(<Tabs activeTab="active" onTabChange={mockOnTabChange} />);

    expect(screen.getByRole('button', { name: 'All' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Active' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Completed' })).toBeEnabled();
  });

  it('calls onTabChange with the correct tab when a tab is clicked', () => {
    render(<Tabs activeTab="all" onTabChange={mockOnTabChange} />);

    fireEvent.click(screen.getByRole('button', { name: 'Active' }));
    expect(mockOnTabChange).toHaveBeenCalledTimes(1);
    expect(mockOnTabChange).toHaveBeenCalledWith('active');

    fireEvent.click(screen.getByRole('button', { name: 'Completed' }));
    expect(mockOnTabChange).toHaveBeenCalledTimes(2);
    expect(mockOnTabChange).toHaveBeenCalledWith('completed');
  });
});
