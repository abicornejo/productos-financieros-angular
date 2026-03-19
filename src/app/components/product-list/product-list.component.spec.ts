import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { ProductoFinanciero } from '../../models/product.model';

describe('ProductListComponent', () => {
    let component: ProductListComponent;
    let fixture: ComponentFixture<ProductListComponent>;

    let productServiceSpy: jasmine.SpyObj<ProductService>;
    let alertServiceSpy: jasmine.SpyObj<AlertService>;

    const sampleProducts: ProductoFinanciero[] = [
        {
            id: 'p1',
            name: 'Cuenta Ahorro',
            description: 'Producto 1',
            logo: 'L1',
            date_release: '2026-01-01',
            date_revision: '2027-01-01',
        },
        {
            id: 'p2',
            name: 'Tarjeta Crédito',
            description: 'Producto 2',
            logo: 'L2',
            date_release: '2026-02-01',
            date_revision: '2027-02-01',
        },
    ];

    beforeEach(async () => {
        productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService', [
            'delete',
            'getProducts'
        ]);
        alertServiceSpy = jasmine.createSpyObj<AlertService>('AlertService', ['show']);

        productServiceSpy.getProducts.and.returnValue(of(sampleProducts));
        productServiceSpy.delete.and.returnValue(of(void 0));

        await TestBed.configureTestingModule({
            imports: [ProductListComponent],
            providers: [
                provideRouter([]),
                { provide: ProductService, useValue: productServiceSpy },
                { provide: AlertService, useValue: alertServiceSpy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductListComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should load products on init and stop loading', fakeAsync(() => {
        fixture.detectChanges(); // triggers ngOnInit -> cargarProductos
        expect(productServiceSpy.getProducts).toHaveBeenCalled();

        // products should be assigned synchronously (of(...) emits immediately)
        expect(component.productos.length).toBe(sampleProducts.length);
        expect(component.cargando).toBeTrue();

        tick(1500);
        expect(component.cargando).toBeFalse();
    }));

    it('should paginate filtered products correctly', () => {
        // make 6 items so we can test paging
        component.productos = Array.from({ length: 6 }).map((_, idx) => ({
            id: `p${idx + 1}`,
            name: `Prod ${idx + 1}`,
            description: `Desc ${idx + 1}`,
            logo: `L${idx + 1}`,
            date_release: '2026-01-01',
            date_revision: '2027-01-01',
        }));

        component.pageSize = 5;
        component.currentPage = 1;
        expect(component.paginatedProductos.length).toBe(5);

        component.currentPage = 2;
        expect(component.paginatedProductos.length).toBe(1);
    });

    it('should update products when search results are emitted', () => {
        component.onInputSearch(sampleProducts.slice(1));
        expect(component.productos.length).toBe(1);
        expect(component.totalItems).toBe(1);
        expect(component.currentPage).toBe(1);
    });

    it('should open and close delete modal', () => {
        const producto = sampleProducts[0];
        component.delete(producto, 0);
        expect(component.showModal).toBeTrue();
        expect(component.productoAEliminar).toEqual(producto);
        expect(component.indexAEliminar).toBe(0);

        component.closeModal();
        expect(component.showModal).toBeFalse();
        expect(component.productoAEliminar).toBeNull();
        expect(component.indexAEliminar).toBeNull();
    });

    it('should navigate to edit route', () => {
        const router = TestBed.inject(Router);
        spyOn(router, 'navigate');
        component.edit(sampleProducts[0]);
        expect(router.navigate).toHaveBeenCalledWith(['/agregar-producto', sampleProducts[0].id]);
    });
});