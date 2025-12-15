'use client'

import css from "./NotesPage.module.css";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

import { Toaster } from "react-hot-toast";

interface Props {
  tag?: string;
}

export default function NotesClient({ tag }:Props) {
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, perPage, debouncedSearch, tag],
    queryFn: () => fetchNotes({ page, perPage, search: debouncedSearch, tag }),
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p className={css.info}>Loading notes, please wait...</p>}
      {isError && (
        <p className={css.error}>There was an error, please try again...</p>
      )}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
      <Toaster/>
    </div>
  );
}
