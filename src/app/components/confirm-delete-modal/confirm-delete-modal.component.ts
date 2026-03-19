import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-confirm-delete-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-delete-modal.component.html',
    styleUrls: ['./confirm-delete-modal.component.css'],
})
export class ConfirmDeleteModalComponent {
    @Input() showModal = false;
    @Input() productoNombre: string = '';

    @Output() cancelar = new EventEmitter<void>();
    @Output() confirmar = new EventEmitter<void>();
}

