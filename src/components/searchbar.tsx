import { SearchIcon, Navigation } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="bg-primary-color flex items-center justify-between gap-1 rounded-md p-5 shadow-md shadow-black/50">
      <div className="flex w-full items-center gap-2">
        <SearchIcon />
        <input
          type="text"
          placeholder="What would you like to eat?"
          className="w-full p-2"
        />
      </div>

      <Navigation />
    </div>
  );
}
