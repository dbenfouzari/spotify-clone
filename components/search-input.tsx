"use client";

import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { Input } from "@/components/input";
import { useDebounce } from "@/hooks/use-debounce";
export function SearchInput() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: "/search",
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  return (
    <Input
      placeholder="What do you want to listen to?"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
