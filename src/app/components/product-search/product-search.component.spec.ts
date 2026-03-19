import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductSearchComponent } from './product-search.component';
import { ProductService } from '../../services/product.service';

describe('ProductSearchComponent', () => {
    let component: ProductSearchComponent;
    let fixture: ComponentFixture<ProductSearchComponent>;

    let productServiceSpy: jasmine.SpyObj<ProductService>;

    beforeEach(async () => {
        productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService', [            
            'getProducts',
        ]);

        await TestBed.configureTestingModule({
            imports: [ProductSearchComponent],
            providers: [{ provide: ProductService, useValue: productServiceSpy }],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call getProductos when terminoBusqueda is empty', () => {
        const results = [{ id: 'p1' }, { id: 'p2' }];
        productServiceSpy.getProducts.and.returnValue(of(results as any));
        spyOn(component.resultadosBusqueda, 'emit');

        component.search = '   ';
        component.onSearch();

        expect(productServiceSpy.getProducts).toHaveBeenCalled();
        expect(component.resultadosBusqueda.emit).toHaveBeenCalledWith(results as any);
    });
});

