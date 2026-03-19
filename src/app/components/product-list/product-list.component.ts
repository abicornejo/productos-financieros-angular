import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductoFinanciero } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { ProductPaginationComponent } from '../product-pagination/product-pagination.component';
import { ProductSearchComponent } from '../product-search/product-search.component';

@Component({
    imports: [CommonModule, RouterLink, ConfirmDeleteModalComponent, ProductPaginationComponent, ProductSearchComponent], // Standalone component dependencies
    standalone: true,
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    productos: ProductoFinanciero[] = [];
    cargando = true;
    openMenuIndex: number | null = null;
    showModal: boolean = false;
    productoAEliminar: any = null;
    indexAEliminar: number | null = null;
    pageSize: number = 5;
    currentPage: number = 1;

    constructor(private productService: ProductService,
        private router: Router, private alertService: AlertService
    ) { }

    ngOnInit(): void {
        this.cargarProductos();
    }

    get totalItems() {
        return this.productos.length;
    }

    get paginatedProductos() {
        const start = (this.currentPage - 1) * this.pageSize;
        return this.productos.slice(start, start + this.pageSize);
    }

    toggleMenu(index: number, event: Event) {
        event.stopPropagation();
        this.openMenuIndex = this.openMenuIndex === index ? null : index;
    }

    closeMenu() {
        this.openMenuIndex = null;
    }

    edit(producto: ProductoFinanciero) {
        this.router.navigate(['/agregar-producto', producto.id]);
    }

    delete(producto: ProductoFinanciero, index: number) {
        this.productoAEliminar = producto;
        this.indexAEliminar = index;
        this.showModal = true;
    }

    confirmarEliminacion() {
        if (this.indexAEliminar !== null) {
            this.productService.delete(this.productoAEliminar.id).subscribe(
                data => {
                    // @ts-ignore
                    if (data.message) {
                        // @ts-ignore
                        this.alertService.show(data.message, data.name ? 'error' : 'success');
                        // @ts-ignore
                        if (!data.name) {
                            this.cargarProductos();
                        }
                    }
                }
            );

        }
        this.closeModal();
    }

    closeModal() {
        this.showModal = false;
        this.productoAEliminar = null;
        this.indexAEliminar = null;
        this.openMenuIndex = null;
    }

    onInputSearch(resultados: ProductoFinanciero[]): void {
        this.productos = resultados ?? [];
        this.currentPage = 1; // Reset pagination when results change
        this.cargando = false;
        this.openMenuIndex = null;
    }

    onChangeRowsByPage(size: number): void {
        this.pageSize = size;
        this.currentPage = 1;
    }

    onChangePage(page: number): void {
        this.currentPage = page;
    }

    cargarProductos(): void {
        this.cargando = true;
        this.currentPage = 1;
        this.openMenuIndex = null;

        this.productService.getProducts().subscribe({
            next: (data) => {
                const productos =
                    Array.isArray(data) ? data : (data as any)?.data;
                this.productos = productos ?? [];

                setTimeout(() => {
                    this.cargando = false;
                }, 1500);
            },
            error: (err) => {
                console.error('Error al cargar productos:', err);
                this.alertService.show('Error al cargar productos:', 'error');
                this.cargando = false;
            }
        });
    }
}