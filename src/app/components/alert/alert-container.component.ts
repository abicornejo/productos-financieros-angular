import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert } from './../../models/alert.model';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AlertComponent } from './alert.component';

@Component({
    imports: [CommonModule, AlertComponent],
    selector: 'app-alert-container',
    templateUrl: './alert-container.component.html',
    styleUrls: ['./alert-container.component.css']
})
export class AlertContainerComponent implements OnInit {

    alerts: Alert[] = [];

    constructor(private alertService: AlertService) { }

    ngOnInit(): void {
        this.alertService.alerts$.subscribe(alerts => {
            this.alerts = alerts;
        });
    }

    trackById(index: number, alert: Alert) {
        return alert.id;
    }
}