import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Graphic } from '../Graphic';

describe('Componente Graphic (Card)', () => {
  it('V10: Renderiza un componente Image con el src y alt correctos', () => {
    render(<Graphic />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Gráfica');
    expect(image).toHaveAttribute('src', expect.stringContaining('colorful-design-icon'));
  });

  it('V11: El componente Link apunta correctamente a /graphics', () => {
    render(<Graphic />);
    const link = screen.getByRole('link', { name: /ver gráficas/i });
    expect(link).toHaveAttribute('href', '/graphics');
  });
});