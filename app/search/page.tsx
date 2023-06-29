import { getSongsByTitle } from "@/actions/get-songs-by-title";
import { SearchContent } from "@/app/search/components/search-content";
import Header from "@/components/header";
import { SearchInput } from "@/components/search-input";

export interface SearchProps {
  searchParams: {
    title: string;
  };
}

export default async function Search({ searchParams }: SearchProps) {
  const songs = await getSongsByTitle(searchParams.title);

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>

          <SearchInput />
        </div>
      </Header>

      <SearchContent songs={songs} />
    </div>
  );
}
