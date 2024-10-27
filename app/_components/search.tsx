"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchProps {
  isHomePage: boolean;
}

const Search = ({ isHomePage }: SearchProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!search) {
      return;
    }

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form className="flex gap-4" onSubmit={handleSearchSubmit}>
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleChange}
        value={search}
      />

      <Button
        size="icon"
        type="submit"
        className={
          isHomePage
            ? "hover:opacity-65 md:bg-[#FFB100] md:hover:bg-amber-600 md:hover:opacity-60"
            : "md:bg-[#EA1D2C] md:hover:opacity-70"
        }
      >
        <SearchIcon size={18} />
      </Button>
    </form>
  );
};

export default Search;
