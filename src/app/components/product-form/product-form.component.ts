import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { AlertService } from '../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ProductoFinanciero } from '../../models/product.model';
import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient

@Component({
    selector: 'app-product-form',
    standalone: true,// Standalone root component (no NgModule)  
    imports: [ReactiveFormsModule, CommonModule],
    //  providers:[ProductService],
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
    productForm: FormGroup;
    today = new Date().toISOString().split('T')[0];
    editMode: boolean = false;
    btnPrimaryDisabled: boolean = true;
    showDuplicatedId: boolean = false;
    product: ProductoFinanciero = {
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: '',
        date_revision: ''
    };

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private alertService: AlertService
    ) {

        const id = this.route.snapshot.paramMap.get('id')?.trim();

        this.editMode = id ? true : false;

        this.productForm = this.fb.group({
            id: [this.product.id, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
            name: [this.product.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
            description: [this.product.description, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
            logo: [this.product.logo, Validators.required],
            date_release: [this.product.date_release, Validators.required],
            date_revision: [this.product.date_revision, Validators.required]
        });

        if (id) {
            this.productService.getById(id).subscribe(
                data => {
                    if (data.id) {
                        for (let key in data) {
                            // @ts-ignore
                            this.product[key] = data[key];
                            // @ts-ignore
                            this.productForm.get(key)?.setValue(data[key]);
                        };
                    }
                }
            );
            this.productForm.get('id')?.disable();
        } else {
            this.productForm.get('id')?.valueChanges.subscribe(value => {
                const tempValue = (value ?? '').toString().trim();
                this.showDuplicatedId = false;

                if (tempValue && tempValue.length >= 3) {

                    this.productService.verifyId(tempValue).subscribe(
                        data => {
                            this.showDuplicatedId = data;
                        }
                    );
                }
            });
        }

        this.productForm.get('date_release')?.valueChanges.subscribe(value => {
            if (value) {
                const date = new Date(value);
                date.setFullYear(date.getFullYear() + 1);
                const revision = date.toISOString().split('T')[0];
                this.productForm.get('date_revision')?.setValue(revision);
            }
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.productForm.controls;
    }

    saveProduct(): void {
        if (this.productForm.invalid) {
            Object.keys(this.productForm.controls).forEach(key => {
                this.productForm.get(key)?.markAsTouched();
            });
            return;
        }

        if (this.product.id && this.editMode) {
            this.productService.update(this.product.id, this.productForm.value).subscribe({
                next: (data) => {
                    // @ts-ignore                   
                    this.alertService.show(data.message, 'success');
                    this.router.navigate(['/']); // Navegar al listado             
                },
                error: (err) => {
                    this.alertService.show('Error al guardar producto:', 'error');
                    console.error('Error al guardar producto:', err);
                }
            });
        } else {
            this.productService.save(this.productForm.value).subscribe({
                next: (data) => {
                    // @ts-ignore   
                    this.alertService.show(data.message, 'success');
                    this.router.navigate(['/']); // Navegar al listado
                },
                error: (err) => {
                    this.alertService.show('Error al actualizar producto:', 'error');
                    console.error('Error al actualizar producto:', err);
                }
            });
        }

    }

    resetForm(): void {
        this.productForm.reset();
    }

    isValidForm(): boolean {
        if (this.productForm.invalid || this.showDuplicatedId) {
            return true
        }
        return false;
    }
}