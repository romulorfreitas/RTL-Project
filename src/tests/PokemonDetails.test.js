import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  describe('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    it('A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsBtn);

      const dragonairDetails = screen.getByRole('heading', { name: /dragonair details/i });
      expect(dragonairDetails).toBeInTheDocument();
    });
    it('Testa se nao existe o link de navegação para os detalhes do Pokémon selecionado;', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsBtn);
      expect(moreDetailsBtn).not.toBeInTheDocument();
    });
    it('Testa se a seção de detalhes contem um heading h2 com o texto Summary;', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsBtn);
      const summary = screen.getByRole('heading', { name: /summary/i });
      expect(summary).toBeInTheDocument();
    });
    it('Testa se a seção de detalhes contem um parágrafo com o resumo do Pokémon específico sendo visualizado', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsBtn);
      const summaryText = screen.getByText(/they say that if it emits an aura from its whole body, the weather will begin to change instantly\./i);
      expect(summaryText).toBeInTheDocument();
    });
  });
  describe('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon.', () => {
    it('Testa se na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsBtn);
      const dragonairLocationText = screen.getByRole('heading', { name: /game locations of dragonair/i });
      expect(dragonairLocationText).toBeInTheDocument();
    });
    it('Testa se todas as localizações do Pokémon sao mostradas na seção de detalhes;', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsBtn);
      const dragonairLocation1 = screen.getByText(/johto route 45/i);
      const dragonairLocation2 = screen.getByText(/johto dragon's den/i);
      expect(dragonairLocation1 && dragonairLocation2).toBeInTheDocument();
    });
    it('Testa se e exibido o nome da localização e uma imagem do mapa em cada localização, os atributos src e alt das imagens', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsBtn);
      const dragonairLocation1 = screen.getByText(/johto route 45/i);
      const dragonairLocation2 = screen.getByText(/johto dragon's den/i);
      const src1 = 'https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png';
      const src2 = 'https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png';
      const alt = 'Dragonair location';
      const dragonairLocationsImg = screen.getAllByRole('img', { name: 'Dragonair location' });
      const img1 = dragonairLocationsImg[0];
      const img2 = dragonairLocationsImg[1];
      expect(dragonairLocationsImg).toHaveLength(2);
      expect(dragonairLocation1 && dragonairLocation2).toBeInTheDocument();
      expect(img1.src).toBe(src1);
      expect(img2.src).toBe(src2);
      expect(img1.alt && img2.alt).toBe(alt);
    });
  });
  describe('Testa se o usuário pode favoritar um Pokémon através da página de detalhes.', () => {
    it('Testa a exibicao de um checkbox que permite favoritar o Pokémon, o toogleClick, bem como a label presente.', () => {
      renderWithRouter(<App />);
      const dragonButton = screen.getByRole('button', { name: /dragon/i });
      userEvent.click(dragonButton);
      const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
      userEvent.click(moreDetailsBtn);
      const favoriteCheckbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
      const favoritePokemonText = screen.getByText(/pokémon favoritado\?/i);
      expect(favoriteCheckbox && favoritePokemonText).toBeInTheDocument();
      userEvent.click(favoriteCheckbox);
      const favoriteIcon = screen.getByRole('img', { name: /dragonair is marked as favorite/i });
      expect(favoriteIcon).toBeInTheDocument();
      userEvent.click(favoriteCheckbox);
      expect(favoriteIcon).not.toBeInTheDocument();
    });
  });
});
