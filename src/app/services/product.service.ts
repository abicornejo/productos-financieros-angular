import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoFinanciero } from '../models/product.model';

@Injectable({ providedIn: 'root' }) // Singleton service
export class ProductService {
    private apiUrl: string = 'http://localhost:3002/bp'; // Reemplaza con la URL real de la API

    constructor(private http: HttpClient) { }

    // Obtener todos los productos
    getProducts(): Observable<ProductoFinanciero[]> {
        return this.http.get<ProductoFinanciero[]>(`${this.apiUrl}/products`);
    }

    // Obtener por ID
    getById(id: string): Observable<ProductoFinanciero> {
        return this.http.get<ProductoFinanciero>(`${this.apiUrl}/products/${id}`);
    }

    // Agregar nuevo producto
    save(producto: ProductoFinanciero): Observable<ProductoFinanciero> {
        return this.http.post<ProductoFinanciero>(
            `${this.apiUrl}/products`,
            producto,
        );
    }
    // Actualizar Producto
    update(
        id: string,
        producto: ProductoFinanciero,
    ): Observable<ProductoFinanciero> {
        return this.http.put<ProductoFinanciero>(
            `${this.apiUrl}/products/${id}`,
            producto,
        );
    }

    // Eliminar producto
    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
    }

    // Validar si ID existe
    verifyId(id: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/products/verification/${id}`);
    }
}
