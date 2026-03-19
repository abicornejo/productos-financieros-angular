import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { ProductoFinanciero } from '../models/product.model';

describe('ProductService', () => {
    let service: ProductService;
    let httpMock: HttpTestingController;

    const baseUrl = 'http://localhost:3002/bp';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });

        service = TestBed.inject(ProductService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getProductos should GET /products', () => {
        const mockProducts: ProductoFinanciero[] = [];

        service.getProducts().subscribe((res) => {
            expect(res).toEqual(mockProducts);
        });

        const req = httpMock.expectOne(`${baseUrl}/products`);
        expect(req.request.method).toBe('GET');
        req.flush(mockProducts);
    });

    it('getById should GET /products/:id', () => {
        const mockProduct: ProductoFinanciero = {
            id: 'p1',
            name: 'Prod',
            description: 'Desc',
            logo: 'L',
            date_release: '2026-01-01',
            date_revision: '2027-01-01',
        };

        service.getById('p1').subscribe((res) => {
            expect(res).toEqual(mockProduct);
        });

        const req = httpMock.expectOne(`${baseUrl}/products/p1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockProduct);
    });

    it('save should POST /products', () => {
        const payload: ProductoFinanciero = {
            id: 'p1',
            name: 'Prod',
            description: 'Desc',
            logo: 'L',
            date_release: '2026-01-01',
            date_revision: '2027-01-01',
        };

        service.save(payload).subscribe((res) => {
            expect(res).toEqual(payload);
        });

        const req = httpMock.expectOne(`${baseUrl}/products`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(payload);
        req.flush(payload);
    });

    it('update should PUT /products/:id', () => {
        const payload: ProductoFinanciero = {
            id: 'p1',
            name: 'Prod',
            description: 'Desc',
            logo: 'L',
            date_release: '2026-01-01',
            date_revision: '2027-01-01',
        };

        service.update('p1', payload).subscribe((res) => {
            expect(res).toEqual(payload);
        });

        const req = httpMock.expectOne(`${baseUrl}/products/p1`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(payload);
        req.flush(payload);
    });

    it('delete should DELETE /products/:id', () => {
        service.delete('p1').subscribe((res) => {
            expect(res).toBeNull();
        });

        const req = httpMock.expectOne(`${baseUrl}/products/p1`);
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });

    it('verifyId should GET /products/verification/:id', () => {
        service.verifyId('p1').subscribe((res) => {
            expect(res).toBeTrue();
        });

        const req = httpMock.expectOne(`${baseUrl}/products/verification/p1`);
        expect(req.request.method).toBe('GET');
        req.flush(true);
    });
});

