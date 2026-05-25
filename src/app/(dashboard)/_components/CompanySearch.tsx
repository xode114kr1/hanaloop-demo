"use client";

import { useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useOutsideClick } from "@/hooks/useOutsideClick";

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
  const normalizedQuery = normalizeSearchValue(query);

  const filteredCompanies = useMemo(() => {
    if (!normalizedQuery) return [];

    return companies.filter((company) =>
      company.name.toLowerCase().includes(normalizedQuery),
    );
  }, [companies, normalizedQuery]);
  const shouldShowDropdown = isOpen && normalizedQuery.length > 0;

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
    <div
      className="relative w-full min-w-0 sm:w-72"
      ref={dropdownRef}
    >
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
        <div
          className="absolute left-0 top-full z-40 mt-2 w-full overflow-hidden rounded-lg border border-(--outline-variant) bg-(--surface-container-lowest) shadow-(--shadow-overlay)"
          id="company-search-listbox"
          role="listbox"
        >
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <button
                aria-selected={company.id === selectedCompanyId}
                className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm transition hover:bg-(--surface-container-low) ${
                  company.id === selectedCompanyId
                    ? "bg-(--primary-container)/10 text-(--on-primary-container)"
                    : "text-(--on-surface)"
                }`}
                key={company.id}
                onClick={() => selectCompany(company)}
                role="option"
                type="button"
              >
                <span className="min-w-0 truncate font-semibold">
                  {company.name}
                </span>
                <span className="text-tiny shrink-0 font-bold text-(--outline)">
                  {company.country}
                </span>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm font-semibold text-(--on-surface-variant)">
              No companies found
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
