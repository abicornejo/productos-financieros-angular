import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { AlertContainerComponent } from './alert-container.component';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../models/alert.model';

describe('AlertContainerComponent', () => {
    let component: AlertContainerComponent;
    let fixture: ComponentFixture<AlertContainerComponent>;

    const alertsSubject = new BehaviorSubject<Alert[]>([]);
    const alertServiceStub = {
        alerts$: alertsSubject.asObservable(),
    } as Partial<AlertService>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AlertContainerComponent],
            providers: [{ provide: AlertService, useValue: alertServiceStub }],
        }).compileComponents();

        fixture = TestBed.createComponent(AlertContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should receive alerts from the service stream', () => {
        const nextAlerts: Alert[] = [
            { id: 1, message: 'A', type: 'info', duration: 3000 },
            { id: 2, message: 'B', type: 'success', duration: 3000 },
        ];

        alertsSubject.next(nextAlerts);
        fixture.detectChanges();

        expect(component.alerts.length).toBe(2);
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelectorAll('app-alert').length).toBe(2);
    });

    it('trackById should return alert id', () => {
        const alert: Alert = {
            id: 10,
            message: 'X',
            type: 'warning',
            duration: 3000,
        };
        expect(component.trackById(0, alert)).toBe(10);
    });
});
