import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testa o componente NotFound', () => {
  it('Testa se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const pageNotFound = screen.getByRole('heading', { name: /page requested not found/i });
    const pikachuCrying = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(pageNotFound && pikachuCrying).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);

    const pikachuCrying = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    const pikachuCryingLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const pikachuCryingAlt = 'Pikachu crying because the page requested was not found';

    expect(pikachuCrying).toBeInTheDocument();
    expect(pikachuCrying.src).toBe(pikachuCryingLink);
    expect(pikachuCrying.alt).toBe(pikachuCryingAlt);
  });
});
