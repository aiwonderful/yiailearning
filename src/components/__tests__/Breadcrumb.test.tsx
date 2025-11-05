import { render, screen } from '@testing-library/react';
import Breadcrumb from '../Breadcrumb';

describe('Breadcrumb', () => {
  it('renders breadcrumb navigation', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Posts', href: '/posts' },
      { label: 'Current', href: '/posts/current' },
    ];

    render(<Breadcrumb items={items} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('renders with custom separator', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Posts', href: '/posts' },
    ];

    render(<Breadcrumb items={items} separator=">" />);

    expect(screen.getByText('>')).toBeInTheDocument();
  });
});
