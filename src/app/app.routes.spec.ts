import { routes } from './app.routes';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';

describe('app routes', () => {
  it('should define the main routes', () => {
    const root = routes.find((r) => r.path === '');
    const form = routes.find((r) => r.path === 'agregar-producto/:id');
    const wildcard = routes.find((r) => r.path === '**');

    expect(root?.component).toBe(ProductListComponent);
    expect(form?.component).toBe(ProductFormComponent);
    expect(wildcard?.redirectTo).toBe('');
  });
});

