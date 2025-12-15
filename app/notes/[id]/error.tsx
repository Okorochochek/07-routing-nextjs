"use client";
import css from "./NoteDetails.module.css"

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
 return(<div>
    <p>Could not fetch note details. {error.message}</p>
    <button className={css.button} onClick={reset}>Try again</button>
  </div>
  )
 
}
