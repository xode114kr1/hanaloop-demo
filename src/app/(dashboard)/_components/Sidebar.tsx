"use client";

import type { MouseEvent } from "react";
import { useState } from "react";

type SidebarItem = {
  label: string;
  href: string;
};

const sidebarItems: SidebarItem[] = [
  { label: "Dashboard Overview", href: "#dashboard-overview" },
  { label: "GHG Emissions", href: "#ghg-emissions" },
  { label: "Recent Posts", href: "#recent-posts" },
  { label: "PCF Lifecycle", href: "#pcf-lifecycle" },
];

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

  event.preventDefault();

  const target = document.querySelector(href);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", href);
}

export function Sidebar() {
  const [activeHref, setActiveHref] = useState(sidebarItems[0]?.href ?? "");

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-70 flex-col border-r border-(--outline-variant) bg-(--surface-bright) px-3 py-6 md:flex">
      <div className="mb-10 px-3">
        <h1 className="text-3xl font-bold tracking-tight text-(--secondary)">
          HanaLoop
        </h1>
      </div>
      <nav className="flex-1 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = activeHref === item.href;

          return (
            <a
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-(--primary-container) text-(--on-primary-container)"
                  : "text-(--on-surface-variant) hover:bg-(--surface-container-highest)"
              }`}
              href={item.href}
              key={item.label}
              onClick={(event) => {
                setActiveHref(item.href);
                scrollToSection(event, item.href);
              }}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
