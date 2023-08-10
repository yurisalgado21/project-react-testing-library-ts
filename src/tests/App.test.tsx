import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.tsx />', () => {
  test('O primeiro link deve ter o texto Home.', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', {
      name: /home/i,
    })).toBeInTheDocument();
  });
  test('O segundo link deve ter o texto About.', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });
  test('O terceiro link deve ter o texto Favorite Pokémon.', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: /Favorite Pokémon/i })).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', {
      name: /home/i,
    });
    await user.click(linkHome);
    expect(screen.getByRole('heading', {
      name: /encountered pokémon/i,
    })).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', {
      name: /about/i,
    });
    await user.click(linkAbout);
    expect(screen.getByRole('heading', {
      name: /about pokédex/i,
    })).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);
    const linkFavoritePokemon = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    await user.click(linkFavoritePokemon);
    expect(screen.getByRole('heading', {
      name: /favorite pokémon/i,
    })).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    renderWithRouter(<App />, { route: '/xablau' });
    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
