import { apiClient } from '../../../lib/api-client';
import { getStoredAdminToken } from '../../../lib/storage';
import type { ServicoResponse } from '../../../types/api';

export type AdminRescheduleInput = {
  date: string;
  time: string;
};

export async function rescheduleAdminBooking(
  eventId: string,
  input: AdminRescheduleInput,
): Promise<ServicoResponse> {
  const adminToken = getStoredAdminToken();
  if (!adminToken) {
    throw new Error('Sessão administrativa ausente.');
  }

  return apiClient<ServicoResponse>(`/api/servicos/admin/${eventId}/reschedule`, {
    method: 'PUT',
    adminToken,
    body: input,
  });
}
