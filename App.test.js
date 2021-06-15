import React from 'react';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<div>teste</div>).toJSON();
  expect(tree).toMatchSnapshot();
});