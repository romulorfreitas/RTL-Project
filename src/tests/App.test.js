import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    it('Testa se os links devem possuir os textos Home, About e Favorite Pokémon', () => {
      renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /home/i });
      const aboutLink = screen.getByRole('link', { name: /about/i });
      const favPokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });

      expect(homeLink && aboutLink && favPokemonLink).toBeInTheDocument();
    });
    describe('Realiza o teste ao clicar no link Home', () => {
      it('Se redireciona para a rota /home, e que o renderiza na tela', () => {
        const { history } = renderWithRouter(<App />);
        const homeLink = screen.getByRole('link', { name: /home/i });

        expect(homeLink).toBeInTheDocument();
        userEvent.click(homeLink);

        const { pathname } = history.location;
        // console.log(pathname);
        expect(pathname).toBe('/');

        const homeTitle = screen.getByRole('heading', { name: /pokédex/i });
        expect(homeTitle).toBeInTheDocument();

        const foundPokemon = screen.getByRole('heading', { name: /encountered pokémon/i });
        expect(foundPokemon).toBeInTheDocument();
      });
    });
    describe('Realiza o teste ao clicar no link About', () => {
      it('Se redireciona para a rota /about, e que o renderiza na tela', () => {
        const { history } = renderWithRouter(<App />);
        const aboutLink = screen.getByRole('link', { name: /about/i });

        expect(aboutLink).toBeInTheDocument();
        userEvent.click(aboutLink);

        const { pathname } = history.location;
        // console.log(pathname);
        expect(pathname).toBe('/about');

        const aboutPokedex = screen.getByRole('heading', { name: /about pokédex/i });
        expect(aboutPokedex).toBeInTheDocument();

        const pokedexImage = screen.getByRole('img', { name: /pokédex/i });
        expect(pokedexImage).toBeInTheDocument();
      });
    });
    describe('Realiza o teste ao clicar no link Favorite Pokemon', () => {
      it('Se redireciona para a rota /favorites, e que o renderiza na tela', () => {
        const { history } = renderWithRouter(<App />);
        const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });

        expect(favoriteLink).toBeInTheDocument();
        userEvent.click(favoriteLink);

        const { pathname } = history.location;
        // console.log(pathname);
        expect(pathname).toBe('/favorites');

        const favoritePokemon = screen.getByRole('heading', { name: /favorite pokémon/i });
        expect(favoritePokemon).toBeInTheDocument();

        const noFavPokemon = screen.getByText(/no favorite pokémon found/i);
        expect(noFavPokemon).toBeInTheDocument();
      });
    });
    describe('Testa uma rota inexistente', () => {
      it('Teste o acesso a uma rota inexistente', () => {
        const { history } = renderWithRouter(<App />);

        act(() => {
          history.push('/page-not-found');
        });
        const notFoundTitle = screen.getByRole('heading', { name: /page requested not found/i });
        expect(notFoundTitle).toBeInTheDocument();

        const pikachuCrying = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
        expect(pikachuCrying).toBeInTheDocument();
      });
    });
  });
});
