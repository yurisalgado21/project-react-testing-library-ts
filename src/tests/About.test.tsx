import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('2. Teste o componente <About.tsx />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const informationPokedex = screen.getByRole('heading', {
      name: /what does this app do\?/i,
    });
    expect(informationPokedex).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const titleAboutPokedex = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(titleAboutPokedex).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragraphOne = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon\./i,
    );
    expect(paragraphOne).toBeInTheDocument();
    const paragraphTwo = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them\./i,
    );
    expect(paragraphTwo).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    renderWithRouter(<About />);
    const imagePokedex = screen.getByRole('img', { name: /pokédex/i });
    const atributeImage = imagePokedex.getAttribute('src');
    expect(atributeImage).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
