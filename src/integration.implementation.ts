import { Integration, VisitData } from './interfaces';

export class PartnerIntegration implements Integration {
    getVisits(begin: any, end: any): Promise<VisitData[]> {
        return Promise.resolve([]);
    }

    close(): Promise<void> {
        return;
    }
}
