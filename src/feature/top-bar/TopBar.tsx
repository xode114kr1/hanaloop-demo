import {
  CompanySearch,
  type CompanySearchItem,
} from "@/feature/company-search/CompanySearch";

type TopBarProps = {
  companies: CompanySearchItem[];
  selectedCompanyId?: string;
};

export function TopBar({ companies, selectedCompanyId }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-(--outline-variant) bg-(--surface) shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-end p-4 md:p-(--space-gutter)">
        <CompanySearch
          companies={companies}
          selectedCompanyId={selectedCompanyId}
        />
      </div>
    </header>
  );
}
