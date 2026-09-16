import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../lib/query-keys';
import { getAdminHistory } from '../api/get-admin-history';
import type { AdminFilters } from '../types';

function buildFiltersKey(filters: AdminFilters) {
  return JSON.stringify(filters ?? {});
}

export function useAdminHistory(filters: AdminFilters = {}, enabled = true) {
  return useQuery({
    queryKey: queryKeys.adminHistory(buildFiltersKey(filters)),
    queryFn: () => getAdminHistory(filters),
    enabled,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
}
