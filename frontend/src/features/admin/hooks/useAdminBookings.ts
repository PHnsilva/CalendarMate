import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/query-keys';
import type { ServicoResponse } from '../../../types/api';
import type { CalendarEvent } from '../../calendar/types';
import { getAdminBookings } from '../api/get-admin-bookings';
import type { AdminFilters } from '../types';
import { toAppDateTimeParts, toAppTimePart } from '../../../lib/dates';

function buildFiltersKey(filters: AdminFilters) {
  return JSON.stringify(filters ?? {});
}

function mapServicoToCalendarEvent(servico: ServicoResponse): CalendarEvent {
  const customerName = `${servico.clientFirstName} ${servico.clientLastName}`.trim();
  const start = toAppDateTimeParts(servico.start);

  return {
    id: servico.eventId,
    title: customerName || servico.serviceType,
    date: start.date,
    startTime: start.time,
    endTime: toAppTimePart(servico.end),
    city: servico.clientCity,
    customerName,
    customerAddress: servico.clientAddressLine,
    customerEmail: servico.clientEmail,
    customerPhone: servico.clientPhone,
    serviceLabel: servico.serviceType,
    status: 'booked',
  };
}

export function useAdminBookings(filters: AdminFilters = {}, enabled = true) {
  const query = useQuery({
    queryKey: queryKeys.adminBookings(buildFiltersKey(filters)),
    queryFn: () => getAdminBookings(filters),
    enabled,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: enabled ? 20_000 : false,
  });

  return {
    ...query,
    calendarEvents: (query.data ?? []).map(mapServicoToCalendarEvent),
  };
}
