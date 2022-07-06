import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  test('Testa se o Link e as informações do Pokemon são mostradas', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getAllByRole('img');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImage[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage[0]).toHaveAttribute('alt', 'Pikachu sprite');

    // por motivos que ainda descobrirei, não é possível para esse teste pegar o type apenas com o testeId e toBeITD;
    // também não é possível pegar a img pelo altText e conferir se ela está no doc, precisei pegar
    // a solução criada pelo Maikson
  });
  test('Testa se a URL exibida no navegador muda', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });

    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    /* const pokemonLink = new RegExp('/..'); */

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favoriteButton = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(favoriteButton);

    const favoriteStar = screen.getByAltText(/is marked as favorite/i);
    const url = '/star-icon.svg';

    expect(favoriteStar).toHaveAttribute('src', url);
    expect(favoriteStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
  // esse requisito foi feito com base no PR do Maikson Estevan
});
