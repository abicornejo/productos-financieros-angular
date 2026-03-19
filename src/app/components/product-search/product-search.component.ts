import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ProductoFinanciero } from '../../models/product.model';

@Component({
    selector: 'app-product-search',
    imports: [FormsModule], // Add FormsModule here
    standalone: true,
    templateUrl: './product-search.component.html',
    styleUrls: ['./product-search.component.css'],
})
export class ProductSearchComponent {
    search: string = '';
    @Output() resultadosBusqueda = new EventEmitter<ProductoFinanciero[]>();

    constructor(private productService: ProductService) { }

    onSearch(): void {
        if (this.search.trim()) {
            this.productService.getProducts().subscribe({
                next: (list) => {
                    // @ts-ignore
                    const result = list?.data?.filter(producto =>
                        producto.name.toLowerCase().includes(this.search.trim().toLowerCase()) ||
                        producto.description.toLowerCase().includes(this.search.trim().toLowerCase())
                        // Add other fields to search if needed
                    );
                    this.resultadosBusqueda.emit(result);
                },
                error: (err) => console.error('Error en la búsqueda:', err),
            });
        } else {
            // Si no hay término, cargar todos los productos
            this.productService.getProducts().subscribe({
                next: (data) => {
                    const productos =
                        Array.isArray(data) ? data : (data as any)?.data;
                    this.resultadosBusqueda.emit(productos)
                },
                error: (err) => console.error('Error al cargar productos:', err),
            });
        }
    }
}
