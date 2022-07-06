import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Teste o componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex em dois <p>', () => {
    renderWithRouter(<About />);
    // chamamos a helper passando o componente a ser renderizado.
    const paragraphs = screen.getAllByText(/pokémons/i);

    // expect(paragraphs).toBeInTheDocument();
    expect(paragraphs).toHaveLength(2);
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen
      .getByRole(
        'heading',
        { name: /about pokédex/i },
        { level: 2 },
      );

    expect(aboutTitle).toBeInTheDocument();
  });
  test('Teste se a página contém uma imagem específica de uma Pokédex', () => {
    renderWithRouter(<About />);
    const img = screen.getByAltText(/pokédex/i);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img).toHaveAttribute('src', url);
    expect(img).toBeInTheDocument();
  });
});
