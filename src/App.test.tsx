import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';

vi.mock('./components/VisitorsChart', () => ({
    __esModule: true,
    VisitorsChart: () => <div data-testid="mocked-visitors-chart" />,
}));

vi.mock('./components/CountryChart', () => ({
    __esModule: true,
    CountryChart: () => <div data-testid="mocked-country-chart" />,
}));

vi.mock('./components/SparklineCard', () => ({
    __esModule: true,
    SparklineCard: () => <div data-testid="mocked-sparkline-card" />,
}));

import App from './App';

describe('App Component', () => {
    test('renders the App component with title and DateRangeSelector', () => {
        render(<App />);

        expect(screen.getByText(/Booking Visualizer/i)).toBeInTheDocument();
        expect(screen.getByText(/Real-time booking insights/i)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(/Select date range/i)).toBeInTheDocument();
    });


    test('renders multiple SparklineCards and charts', () => {
        render(<App />);
    
        const sparklineCards = screen.getAllByTestId('mocked-sparkline-card');
    
        expect(sparklineCards).toHaveLength(2);
        sparklineCards.forEach((card) => {
            expect(card).toBeInTheDocument();
        });
    });
    

    test('renders Visitor chart', () => {
        render(<App />);

        expect(screen.getByTestId('mocked-visitors-chart')).toBeInTheDocument();
    });

    test('renders Country chart', () => {
        render(<App />);

        console.log(screen.getByTestId('mocked-country-chart'))

        expect(screen.getByTestId('mocked-country-chart')).toBeInTheDocument();
    });

});
