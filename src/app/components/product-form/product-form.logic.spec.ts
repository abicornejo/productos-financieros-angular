import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ProductFormComponent } from './product-form.component';
import { ProductService } from '../../services/product.service';
import { AlertService } from '../../services/alert.service';

describe('ProductFormComponent (logic)', () => {
    let component: ProductFormComponent;
    let fixture: ComponentFixture<ProductFormComponent>;

    let productServiceSpy: jasmine.SpyObj<ProductService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let alertServiceSpy: jasmine.SpyObj<AlertService>;

    beforeEach(async () => {
        productServiceSpy = jasmine.createSpyObj<ProductService>('ProductService', [
            'verifyId',
            'save',
            'update',
            'getById',
        ]);
        productServiceSpy.verifyId.and.returnValue(of(false));
        productServiceSpy.save.and.returnValue(of({ message: 'ok' } as any));
        productServiceSpy.update.and.returnValue(of({ message: 'ok' } as any));
        productServiceSpy.getById.and.returnValue(
            of({
                id: 'p1',
                name: 'Prod',
                description: 'Desc',
                logo: 'L',
                date_release: '2026-01-01',
                date_revision: '2027-01-01',
            } as any)
        );

        routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
        alertServiceSpy = jasmine.createSpyObj<AlertService>('AlertService', ['show']);

        const activatedRouteStub = {
            snapshot: {
                paramMap: {
                    get: (_key: string) => null, // create mode
                },
            },
        };

        TestBed.overrideComponent(ProductFormComponent, {
            set: {
                providers: [{ provide: ProductService, useValue: productServiceSpy }],
            },
        });

        await TestBed.configureTestingModule({
            imports: [ProductFormComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: Router, useValue: routerSpy },
                { provide: AlertService, useValue: alertServiceSpy },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should auto-set date_revision to +1 year when date_release changes', () => {
        component.productForm.get('date_release')?.setValue('2026-03-18');
        expect(component.productForm.get('date_revision')?.value).toBe('2027-03-18');
    });

    it('isValidForm should return true when form is invalid', () => {
        component.productForm.reset();
        expect(component.isValidForm()).toBeTrue();
    });

    it('isValidForm should return true when showDuplicatedId is true', () => {
        component.showDuplicatedId = true;
        expect(component.isValidForm()).toBeTrue();
    });

    it('saveProduct should call ProductService.save in create mode when form is valid', () => {
        component.productForm.setValue({
            id: 'abc',
            name: 'Producto name',
            description: 'Descripcion larga 123',
            logo: 'logo',
            date_release: '2026-01-01',
            date_revision: '2027-01-01',
        });

        component.saveProduct();

        expect(productServiceSpy.save).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });
});

