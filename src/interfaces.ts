import { DateTime } from 'luxon';

export interface VisitData {
  id: string;
  care_recipient_id: string;
  caregiverIds: string[];
  // in ISO format 2019-10-15T00:05:32.000Z
  start_at: string;
  end_at: string;
}

export interface Integration {
  getVisits(begin: DateTime, end: DateTime): Promise<VisitData[]>;
  close(): Promise<void>;
}
