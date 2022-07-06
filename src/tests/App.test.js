import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

// 1º importações necessárias, react, testing-library, renderWithRouter e App

describe('Teste o componente <App.js />', () => {
// 2º criação das constantes que acessam os elementos que serão testados por meio do screen
// chamada da função helper renderWithRouter
  // /string/i é utilizado para ignorar case sensitive, regex
  test('Teste se o topo contém links específicos com seus títulos respectivos', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritesLink).toBeInTheDocument();
  });
  // teste que utiliza as constantes para conferir se os links estão no documento
  test('Teste o título e se ao clicar é redirecionada para a Home, na URL /', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const { pathname } = history.location;
    const homeTitle = screen.getByRole(
      'heading',
      { name: /encountered pokémons/i },
    );

    expect(homeTitle).toBeInTheDocument();
    expect(pathname).toBe('/');
  });
  test('Teste o título e se ao clicar vai para a página About, na URL /about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    const aboutTitle = screen.getByRole(
      'heading',
      { name: /about pokédex/i },
    );

    expect(aboutTitle).toBeInTheDocument();
    expect(pathname).toBe('/about');
  });
  test('Teste o título e se vai para Pokémons Favoritados, na URL /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritesLink);

    const { pathname } = history.location;
    const favoritesTitle = screen.getByRole(
      'heading',
      { name: /favorite pokémons/i },
    );

    expect(favoritesTitle).toBeInTheDocument();
    expect(pathname).toBe('/favorites');
  });
  // testes que conferem se o redirecionamento e se o título da página está correto
  test('Teste se a página Not Found é acessada ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');

    const notFound = screen.getByRole(
      'heading',
      { name: /page requested not found/i },
    );

    expect(notFound).toBeInTheDocument();
  });
  // testa o comportamento específico da página de erro 404
});
