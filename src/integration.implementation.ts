import { DateTime } from 'luxon';
import { Integration, VisitData } from './interfaces';

export class PartnerIntegration implements Integration {
    constructor() {
        throw new Error('Not implemented.');
    }

    getVisits(begin: DateTime, end: DateTime): Promise<VisitData[]> {
        throw new Error('Not implemented.');
    }

    close(): Promise<void> {
        throw new Error('Not implemented.');
    }
}
