import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { AlertService } from '../../services/alert.service';

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;

    let alertServiceSpy: jasmine.SpyObj<AlertService>;

    beforeEach(async () => {
        alertServiceSpy = jasmine.createSpyObj<AlertService>('AlertService', ['remove']);

        await TestBed.configureTestingModule({
            imports: [AlertComponent],
            providers: [{ provide: AlertService, useValue: alertServiceSpy }],
        }).compileComponents();

        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        component.alert = { id: 123, message: 'Hello', type: 'success', duration: 3000 };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call AlertService.remove on close()', () => {
        component.close();
        expect(alertServiceSpy.remove).toHaveBeenCalledWith(123);
    });
});

