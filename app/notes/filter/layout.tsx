import css from './LayoutNotes.module.css';

export default function FilterLayout({
    sidebar, children
}: {
    sidebar: React.ReactNode;
    children: React. ReactNode;
}) {
    return(
        <section className={css.container}>
            <aside className={css.sidebar}>{sidebar}</aside>
            <div className={css.notesWrapper}>{children}</div>
        </section>
    )
}