import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteModalComponent } from './confirm-delete-modal.component';

describe('ConfirmDeleteModalComponent', () => {
    let component: ConfirmDeleteModalComponent;
    let fixture: ComponentFixture<ConfirmDeleteModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConfirmDeleteModalComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ConfirmDeleteModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not render modal when showModal is false', () => {
        component.showModal = false;
        fixture.detectChanges();

        const backdrop = fixture.nativeElement.querySelector('.modal-backdrop');
        expect(backdrop).toBeNull();
    });

    it('should render product name when showModal is true', () => {
        component.showModal = true;
        component.productoNombre = 'Tarjeta Crédito';
        fixture.detectChanges();

        const text = fixture.nativeElement.textContent as string;
        expect(text).toContain('Tarjeta Crédito');
    });

    it('should emit cancelar when clicking Cancelar', () => {
        component.showModal = true;
        fixture.detectChanges();

        spyOn(component.cancelar, 'emit');

        const btn = fixture.nativeElement.querySelector('button.btn-cancel') as HTMLButtonElement;
        btn.click();

        expect(component.cancelar.emit).toHaveBeenCalled();
    });

    it('should emit confirmar when clicking Confirmar', () => {
        component.showModal = true;
        fixture.detectChanges();

        spyOn(component.confirmar, 'emit');

        const btn = fixture.nativeElement.querySelector('button.btn-confirm') as HTMLButtonElement;
        btn.click();

        expect(component.confirmar.emit).toHaveBeenCalled();
    });
});

