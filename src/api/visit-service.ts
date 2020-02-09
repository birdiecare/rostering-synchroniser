import { DateTime } from 'luxon';

import { Injectable } from '@nestjs/common';

import APIService from './api-service';
import { VisitData } from 'src/interfaces';
import { Visit } from './types';

@Injectable()
export default class ApiVisitService {
  constructor(private readonly apiService: APIService) {
    this.apiService.configure('/visits');
  }

  async getAll(from: DateTime, to: DateTime) {
    return await this.apiService.request<Visit[]>({
      method: 'GET',
      url: ``,
      params: {
        from: from.toFormat('yyyy-MM-dd'),
        to: to.toFormat('yyyy-MM-dd'),
      },
    });
  }

  async getVisit(visitId: string) {
    return await this.apiService.request<Visit>({
      method: 'GET',
      url: `/${visitId}`,
    });
  }

  async getCareRecipientVisits(
    careRecipientId: string,
    timeRange: {
      from?: string;
      to?: string;
    } = {},
  ): Promise<Visit[]> {
    return await this.apiService.request<Visit[]>({
      method: 'GET',
      url: ``,
      params: {
        care_recipient_id: careRecipientId,
        ...(timeRange.from && { from: timeRange.from }),
        ...(timeRange.to && { to: timeRange.to }),
      },
    });
  }

  async addCaregiverToVisit(
    visitId: string,
    caregiverId: string,
  ): Promise<Visit> {
    return await this.apiService.request<Visit>({
      method: 'POST',
      url: `/${visitId}/caregivers/${caregiverId}`,
    });
  }

  async removeCaregiverFromVisit(
    visitId: string,
    caregiverId: string,
  ): Promise<void> {
    await this.apiService.request({
      method: 'DELETE',
      url: `/${visitId}/caregivers/${caregiverId}`,
    });
  }

  async scheduleVisit(visitData: VisitData): Promise<Visit> {
    return await this.apiService.request<Visit>({
      method: 'POST',
      url: '',
      data: visitData,
    });
  }

  async cancelVisit(visitId: string): Promise<void> {
    await this.apiService.request({
      method: 'DELETE',
      url: `/${visitId}`,
    });
  }

  async updateVisit(visitData: VisitData): Promise<Visit> {
    const { id: visitId, ...data } = visitData;
    return await this.apiService.request<Visit>({
      method: 'PUT',
      url: `/${visitId}`,
      data,
    });
  }
}
