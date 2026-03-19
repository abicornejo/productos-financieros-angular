import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './../product-form/product-form.component';
// import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
// import { ProductService } from '../../services/product.service';
import { AlertService } from '../../services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('ProductFormComponent', () => {
    let component: ProductFormComponent;
    let fixture: ComponentFixture<ProductFormComponent>;

    beforeEach(async () => {
        const routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
        const alertServiceSpy = jasmine.createSpyObj<AlertService>('AlertService', ['show']);
        const activatedRouteStub = {
            snapshot: {
                paramMap: {
                    get: (_key: string) => null, // create mode by default
                },
            },
        };

        await TestBed.configureTestingModule({
            imports: [ProductFormComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: Router, useValue: routerSpy },
                { provide: AlertService, useValue: alertServiceSpy },
                { provide: ActivatedRoute, useValue: activatedRouteStub },
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProductFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});