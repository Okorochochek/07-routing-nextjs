import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { HydrationBoundary } from '@tanstack/react-query';
import NotesClient from './Notes.client';


export default async function Notes() {
  const queryClient = new QueryClient();

  const page = 1;
  const perPage = 12;
  const search = '';

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes({ page, search, perPage }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}