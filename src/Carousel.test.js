import React from 'react';
import { render, fireEvent, queryByAltText } from '@testing-library/react';
import Carousel from './Carousel';

it('renders without crashing', () => {
	render(<Carousel />);
});

it('should match snapshot', () => {
	const { asFragment } = render(<Carousel />);
	expect(asFragment()).toMatchSnapshot();
});

it('works when you click on the right arrow', function() {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// expect the first image to show, but not the second
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = queryByTestId('right-arrow');
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();
});

it('should go back to previous image when clicking left arrow', () => {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// move forward in the carousel
	const rightArrow = queryByTestId('right-arrow');
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).not.toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();

	const leftArrow = queryByTestId('left-arrow');
	fireEvent.click(leftArrow);

	// expect the first image to show, but not the second
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).not.toBeInTheDocument();
});

it('should hide left arrow when displaying first image', () => {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	const leftArrow = queryByTestId('left-arrow');

	// make sure first image is showing
	expect(queryByAltText('Photo by Richard Pasquarella on Unsplash')).toBeInTheDocument();
	expect(leftArrow).not.toBeInTheDocument();
});

it('should show both arrows when not in first or last image', () => {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	const rightArrow = queryByTestId('right-arrow');

	fireEvent.click(rightArrow);

	const leftArrow = queryByTestId('left-arrow');

	// make sure second image is showing
	expect(queryByAltText('Photo by Pratik Patel on Unsplash')).toBeInTheDocument();
	expect(rightArrow).toBeInTheDocument();
	expect(leftArrow).toBeInTheDocument();
});

it('should hide right arrow when displaying last image', () => {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	const rightArrow = queryByTestId('right-arrow');

	fireEvent.click(rightArrow);
	fireEvent.click(rightArrow);

	// make sure last image is showing
	expect(queryByAltText('Photo by Josh Post on Unsplash')).toBeInTheDocument();
	expect(rightArrow).not.toBeInTheDocument();
});
