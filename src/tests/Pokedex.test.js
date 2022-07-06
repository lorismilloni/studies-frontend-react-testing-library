import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import isFavoriteById from '../mocks/isPokemonFavorite';

describe('Teste o componente Pokedex', () => {
  test('Teste se página contém um heading h2 com o texto especificado', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavoriteById }
    />);

    const pokedexTitle = screen
      .getByRole(
        'heading',
        { name: /encountered pokémons/i },
        { level: 2 },
      );

    expect(pokedexTitle).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon quando o botão Próximo é clicado', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isFavoriteById }
    />);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    pokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      userEvent.click(nextButton);
    });

    // a cada vez que o forEach passa clica no nextButton

    const infoPokemon = screen.getByText(pokemons[0].name);

    // como pokemons é um array de objetos, selecionamos o index 0 para pegarmos o name no primeiro objeto

    expect(infoPokemon).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteById }
      />,
    );
    const nextButton = screen.getByRole(
      'button',
      { name: /próximo pokémon/i },
    );

    pokemons.forEach(() => {
      expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
      userEvent.click(nextButton);
    });

    const nextPokemon = screen.getAllByTestId('pokemon-name');

    expect(nextPokemon).toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteById }
      />,
    );

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const FLTR_BTN = 7;

    expect(filterButtons).toHaveLength(FLTR_BTN);

    userEvent.click(filterButtons[3]);
    expect(filterButtons[3]).toHaveTextContent('Poison');
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isFavoriteById }
      />,
    );

    const resetButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(resetButton);

    expect(resetButton).toBeInTheDocument();
  });
});

// esse requisito usa como base o PR do Rafael França até o terceiro teste e o do Leonardo Vogel para os dois últimos;
