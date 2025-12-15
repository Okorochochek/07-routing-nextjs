import css from "./SidebarNotes.module.css";
import Link from "next/link";

export default async function NotesSidebar() {
  const tags = ["Work", "Personal", "Todo", "Meeting", "Shopping"];

  return (
    <div className={css.sidebar}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
