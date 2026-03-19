import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AlertService } from '../../services/alert.service';
import { Alert } from './../../models/alert.model';


@Component({
    imports: [CommonModule],
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent {

    @Input() alert!: Alert;

    constructor(private alertService: AlertService) { }

    close() {
        this.alertService.remove(this.alert.id);
    }
}