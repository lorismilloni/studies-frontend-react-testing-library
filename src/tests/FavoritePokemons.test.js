import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente FavoritePokemons', () => {
  test('Teste se não tiver pokémons favoritados, teste se é exibido o texto', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavorite = screen.getByText(/no favorite pokemon found/i);

    expect(noFavorite).toBeInTheDocument();
  });
  test('Teste se os cards dos pokémons favoritados aparecem', () => {
    const pokemon = [{
      averageWeight: { measurementUnit: 'kg', value: '6.0' },
      id: 25,
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      name: 'Pikachu',
      type: 'Electric',
    }];

    renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const img = screen.getByAltText(/sprite/i);
    const favorite = screen.getByAltText(/is marked as favorite/i);

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });
});

// requisito 3, feito com base no modelo da Rachel Tairum, que cria um constante de um pokemon dentro do teste para ser testada.
