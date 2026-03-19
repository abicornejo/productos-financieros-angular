import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-pagination',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './product-pagination.component.html',
    styleUrls: ['./product-pagination.component.css']
})
export class ProductPaginationComponent {
    @Input() totalRows = 0;
    @Input() rowsByPage: number = 5;
    @Output() cambioRegistrosPorPagina = new EventEmitter<number>();
    @Output() cambioPagina = new EventEmitter<number>();

    rowOptions = [5, 10, 20];
    currentPage = 1;

    changeRowsByPage(opcion: number): void {
        this.rowsByPage = opcion;
        this.currentPage = 1;
        this.cambioRegistrosPorPagina.emit(opcion);
    }

    changePage(pagina: number): void {
        this.currentPage = pagina;
        this.cambioPagina.emit(pagina);
    }

    get totalPages(): number {
        return Math.ceil(this.totalRows / this.rowsByPage);
    }
}