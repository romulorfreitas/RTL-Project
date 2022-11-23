import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  describe('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    it('Testa se o nome correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const pokemonName = screen.getByText(/dragonair/i);
      expect(pokemonName).toBeInTheDocument();
    });
    it('O tipo correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const pokemonName = screen.getByText(/dragonair/i);
      const dragonType = screen.queryByTestId('pokemon-type');
      expect(pokemonName && dragonType).toBeInTheDocument();
      expect(dragonType.textContent).toBe('Dragon');
    });
    it('Testa o peso médio do Pokémon', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const pokemonName = screen.getByText(/dragonair/i);
      expect(pokemonName).toBeInTheDocument();
      const dragonairWeight = screen.getByText(/average weight: 16\.5 kg/i);
      expect(dragonairWeight).toBeInTheDocument();
    });
    it('Testa a imagem do Pokémon', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const pokemonName = screen.getByText(/dragonair/i);
      expect(pokemonName).toBeInTheDocument();
      const dragonairSrc = 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png';
      const dragonairImage = screen.getByRole('img', { name: /dragonair sprite/i });
      expect(dragonairImage).toBeInTheDocument();
      expect(dragonairImage.src).toBe(dragonairSrc);
      expect(dragonairImage.alt).toBe('Dragonair sprite');
    });
  });
  describe('Testa o link de navegacao more details', () => {
    it('Testa se o link possui a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
      const { history } = renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
      expect(moreDetailsBtn).toBeInTheDocument();
      userEvent.click(moreDetailsBtn);
      const { pathname } = history.location;
      expect(pathname).toBe('/pokemon/148');
    });
  });
  describe('Testa o link de navegacao do Pokemon', () => {
    it('Testa se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
      expect(moreDetailsBtn).toBeInTheDocument();
      userEvent.click(moreDetailsBtn);
      const summaryText = screen.getByText(/they say that if it emits an aura from its whole body, the weather will begin to change instantly\./i);
      expect(summaryText).toBeInTheDocument();
    });
  });
  describe('Testa os detalhes do link more details clicado', () => {
    it('Testa se os detalhes do Pokémon aparecem ao clicar no butao more details', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsBtn);
      const dragonairDetails = screen.getByRole('heading', { name: /dragonair details/i });
      expect(dragonairDetails).toBeInTheDocument();
    });
  });
  describe('Testa o icone de favoritar', () => {
    it('Testa se o ícone e uma imagem com o atributo src contendo o caminho /star-icon.svg', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsBtn);
      const toFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
      userEvent.click(toFavorite);
      const favoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
      userEvent.click(favoritePokemon);
      const starIcon = screen.getByRole('img', { name: /dragonair is marked as favorite/i });
      const starIconLink = 'http://localhost/star-icon.svg';
      const starIconAlt = 'Dragonair is marked as favorite';
      expect(starIcon.src).toBe(starIconLink);
      expect(starIcon.alt).toBe(starIconAlt);
    });
  });
});
