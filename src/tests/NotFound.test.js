import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente NotFound', () => {
  test('Teste se contém um h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen
      .getByRole(
        'heading',
        { name: /page requested not found/i },
        { level: 2 },
      );

    expect(notFoundTitle).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem correta', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(/not found/i);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toHaveAttribute('src', url);
    expect(img).toBeInTheDocument();
  });
});
