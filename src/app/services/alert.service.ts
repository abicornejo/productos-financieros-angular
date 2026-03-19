import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from './../models/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {

    private alerts: Alert[] = [];
    private alertsSubject = new BehaviorSubject<Alert[]>([]);

    alerts$ = this.alertsSubject.asObservable();

    private id = 0;

    show(message: string, type: Alert['type'] = 'info', duration = 3000) {
        const alert: Alert = {
            id: ++this.id,
            message,
            type,
            duration
        };

        this.alerts.push(alert);
        this.alertsSubject.next([...this.alerts]);

        // auto remove
        setTimeout(() => this.remove(alert.id), duration);
    }

    remove(id: number) {
        this.alerts = this.alerts.filter(a => a.id !== id);
        this.alertsSubject.next([...this.alerts]);
    }

    clear() {
        this.alerts = [];
        this.alertsSubject.next([]);
    }
}