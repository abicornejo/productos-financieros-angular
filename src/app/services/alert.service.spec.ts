import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
    let service: AlertService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AlertService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('show should push an alert and emit it', () => {
        const values: any[] = [];
        const sub = service.alerts$.subscribe((alerts) => values.push(alerts));

        service.show('Hello', 'success', 999999);

        expect(values.at(-1).length).toBe(1);
        expect(values.at(-1)[0].message).toBe('Hello');
        expect(values.at(-1)[0].type).toBe('success');

        sub.unsubscribe();
    });

    it('remove should remove an alert by id', () => {
        let last: any[] = [];
        const sub = service.alerts$.subscribe((alerts) => (last = alerts));

        service.show('A', 'info', 999999);
        service.show('B', 'info', 999999);
        expect(last.length).toBe(2);

        const idToRemove = last[0].id;
        service.remove(idToRemove);
        expect(last.length).toBe(1);
        expect(last[0].message).toBe('B');

        sub.unsubscribe();
    });

    it('clear should remove all alerts', () => {
        let last: any[] = [];
        const sub = service.alerts$.subscribe((alerts) => (last = alerts));

        service.show('A', 'info', 999999);
        expect(last.length).toBe(1);

        service.clear();
        expect(last.length).toBe(0);

        sub.unsubscribe();
    });

    it('show should auto-remove after duration', fakeAsync(() => {
        let last: any[] = [];
        const sub = service.alerts$.subscribe((alerts) => (last = alerts));

        service.show('Auto', 'warning', 10);
        expect(last.length).toBe(1);

        tick(10);
        expect(last.length).toBe(0);

        sub.unsubscribe();
    }));
});

