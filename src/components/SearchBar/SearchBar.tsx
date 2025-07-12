import css from "./SearchBar.module.css";
import { toast } from "react-hot-toast";
interface SearchFormProps {
  onSubmit: (topic: string) => void;
}
export default function SearchBar({ onSubmit }: SearchFormProps) {
  const handleSubmit = (formData: FormData) => {
    const topic = (formData.get("query") as string).trim();
    if (topic === "") {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(topic);
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={css.form} action={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}

// interface SearchFormProps {
//   onSubmit: (topic: string) => void;
// }
// export default function SearchBar({ onSubmit }: SearchFormProps) {
//   const handleSubmit = (formData: FormData) => {
//     const query = formData.get("query") as string;
//     console.log(query);
//   };
// export default function SearchBar() {
//   const handleSubmit = (formData: FormData) => {
//     const query = formData.get("query") as string;
//     console.log(query.length);
//   };
