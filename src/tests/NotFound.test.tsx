import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('4. Teste o componente <NotFound.tsx />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<App />, { route: '/xablau' });
    const headingNotFound = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(headingNotFound).toBeInTheDocument();
  });
  test("Teste se a página mostra a imagem com o texto alternativo Clefairy pushing buttons randomly with text I have no idea what i 'm doing", () => {
    renderWithRouter(<App />, { route: '/xablau' });
    const imgNotFound = screen.getByRole('img', {
      name: /clefairy pushing buttons randomly with text i have no idea what i'm doing/i,
    });
    const srcImageNotFound = imgNotFound.getAttribute('alt');
    expect(srcImageNotFound).toBe("Clefairy pushing buttons randomly with text I have no idea what i'm doing");
  });
});
