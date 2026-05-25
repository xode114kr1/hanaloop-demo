"use client";

import { useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { CompanySearchDropdown } from "./CompanySearchDropdown";

export type CompanySearchItem = {
  id: string;
  name: string;
  country: string;
};

type CompanySearchProps = {
  companies: CompanySearchItem[];
  selectedCompanyId?: string;
};

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

function getSelectedCompanyName(
  companies: CompanySearchItem[],
  selectedCompanyId?: string,
) {
  return (
    companies.find((company) => company.id === selectedCompanyId)?.name ?? ""
  );
}

export function CompanySearch({
  companies,
  selectedCompanyId,
}: CompanySearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(() =>
    getSelectedCompanyName(companies, selectedCompanyId),
  );
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 200);
  const normalizedQuery = normalizeSearchValue(debouncedQuery);

  const filteredCompanies = useMemo(() => {
    if (!normalizedQuery) return [];

    return companies.filter((company) =>
      company.name.toLowerCase().includes(normalizedQuery),
    );
  }, [companies, normalizedQuery]);
  const shouldShowDropdown = isOpen && normalizeSearchValue(query).length > 0;

  useOutsideClick({
    ref: dropdownRef,
    enabled: isOpen,
    onOutsideClick: () => setIsOpen(false),
  });

  function selectCompany(company: CompanySearchItem) {
    const params = new URLSearchParams({ companyId: company.id });

    setQuery(company.name);
    setIsOpen(false);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function selectFirstCompany() {
    const [firstCompany] = filteredCompanies;
    if (!firstCompany) return;

    selectCompany(firstCompany);
  }

  return (
    <div className="relative w-full min-w-0 sm:w-72" ref={dropdownRef}>
      <input
        aria-autocomplete="list"
        aria-controls="company-search-listbox"
        aria-expanded={shouldShowDropdown}
        aria-label="Search companies"
        className="w-full rounded-full border border-transparent bg-(--surface-container-low) py-2 pl-9 pr-4 text-sm text-(--on-surface) outline-none transition focus:border-(--primary-container) focus:shadow-(--focus-ring)"
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key !== "Enter") return;

          event.preventDefault();
          selectFirstCompany();
        }}
        placeholder="Search companies..."
        role="combobox"
        type="search"
        value={query}
      />

      {shouldShowDropdown ? (
        <CompanySearchDropdown
          companies={filteredCompanies}
          onSelectCompany={selectCompany}
          selectedCompanyId={selectedCompanyId}
        />
      ) : null}
    </div>
  );
}
