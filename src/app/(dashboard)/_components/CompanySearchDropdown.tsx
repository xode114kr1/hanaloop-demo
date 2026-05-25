import type { CompanySearchItem } from "./CompanySearch";

type CompanySearchDropdownProps = {
  companies: CompanySearchItem[];
  selectedCompanyId?: string;
  onSelectCompany: (company: CompanySearchItem) => void;
};

export function CompanySearchDropdown({
  companies,
  selectedCompanyId,
  onSelectCompany,
}: CompanySearchDropdownProps) {
  return (
    <div
      className="absolute left-0 top-full z-40 mt-2 w-full overflow-hidden rounded-lg border border-(--outline-variant) bg-(--surface-container-lowest) shadow-(--shadow-overlay)"
      id="company-search-listbox"
      role="listbox"
    >
      {companies.length > 0 ? (
        companies.map((company) => (
          <button
            aria-selected={company.id === selectedCompanyId}
            className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm transition hover:bg-(--surface-container-low) ${
              company.id === selectedCompanyId
                ? "bg-(--primary-container)/10 text-(--on-primary-container)"
                : "text-(--on-surface)"
            }`}
            key={company.id}
            onClick={() => onSelectCompany(company)}
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
  );
}
