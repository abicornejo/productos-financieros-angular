import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPaginationComponent } from './product-pagination.component';

describe('ProductPaginationComponent', () => {
    let component: ProductPaginationComponent;
    let fixture: ComponentFixture<ProductPaginationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProductPaginationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ProductPaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('totalPaginas should be calculated from totalRegistros and registrosPorPagina', () => {
        component.totalRows = 11;
        component.rowsByPage = 5;
        expect(component.totalPages).toBe(3);
    });

    it('cambiarRegistrosPorPagina should reset paginaActual and emit', () => {
        spyOn(component.cambioRegistrosPorPagina, 'emit');
        component.currentPage = 3;

        component.changeRowsByPage(10);

        expect(component.rowsByPage).toBe(10);
        expect(component.currentPage).toBe(1);
        expect(component.cambioRegistrosPorPagina.emit).toHaveBeenCalledWith(10);
    });

    it('cambiarPagina should set paginaActual and emit', () => {
        spyOn(component.cambioPagina, 'emit');
        component.changePage(2);
        expect(component.currentPage).toBe(2);
        expect(component.cambioPagina.emit).toHaveBeenCalledWith(2);
    });
});

