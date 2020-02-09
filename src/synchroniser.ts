import _ from 'lodash';
import { DateTime } from 'luxon';

import { Inject, Injectable, Logger } from '@nestjs/common';

import { Integration, VisitData } from './interfaces';
import ApiVisitService from './api/visit-service';
import { Visit } from './api/types';

@Injectable()
export class Synchroniser {
  private readonly logger = new Logger('Synchroniser');

  constructor(
    @Inject(ApiVisitService)
    private readonly apiVisitService: ApiVisitService,
  ) {}

  async synchronise(integration: Integration) {
    this.logger.log('Starting synchronisation');

    // Visits
    this.logger.log('Synchronising visits');
    const start = DateTime.local().startOf('day');
    const end = DateTime.local()
      .endOf('day')
      .plus({ days: 6 });

    const visits = (await integration.getVisits(start, end)).filter(visit => {
      return (
        DateTime.fromISO(visit.start_at) > start &&
        DateTime.fromISO(visit.end_at) < end
      );
    });

    const existingVisits = await this.apiVisitService.getAll(start, end);

    const visitIds = visits.map(v => v.id);
    const visitsCancelled = existingVisits.filter(
      existingVisit => !visitIds.includes(existingVisit.id),
    );

    for (const visit of visitsCancelled) {
      await this.apiVisitService.cancelVisit(visit.id);
    }

    for (const visit of visits) {
      await this.mergeOrCreateVisit(existingVisits, visit);
    }

    this.logger.log(
      {
        number_of_visits: visits.length,
      },
      `Synchronised visits`,
    );

    await integration.close();
  }

  async mergeOrCreateVisit(existingVisits: Visit[], visit: VisitData) {
    const existingVisit = existingVisits.find(v => v.id === visit.id);

    if (!existingVisit) {
      await this.apiVisitService.scheduleVisit(visit);
    } else {
      const hasVisitChanged =
        existingVisit.start_at !== visit.start_at ||
        existingVisit.end_at !== visit.end_at ||
        existingVisit.careRecipient.id !== visit.care_recipient_id;

      if (hasVisitChanged) {
        await this.apiVisitService.updateVisit(visit);
      }
    }

    const links = visit.caregiverIds;
    const existingLinks = existingVisit?.caregivers || [];

    const removedCaregiverIds = _.difference(
      existingLinks.map(link => link.user.id),
      links,
    );
    for (const id of removedCaregiverIds) {
      await this.apiVisitService.removeCaregiverFromVisit(visit.id, id);
    }

    const addedCaregiverIds = _.difference(
      links,
      existingLinks.map(link => link.user.id),
    );
    if (links.length) {
      for (const id of addedCaregiverIds) {
        await this.apiVisitService.addCaregiverToVisit(visit.id, id);
      }
    }
  }
}
