import {
  fetchEmissionsChart,
  type EmissionsChartPeriod,
  type EmissionsChartScope,
} from "@/lib/api";

const validPeriods = new Set<EmissionsChartPeriod>(["monthly", "yearly"]);
const validScopes = new Set<EmissionsChartScope>([
  "all",
  "scope1",
  "scope2",
  "scope3",
]);

function getPeriod(value: string | null): EmissionsChartPeriod {
  if (!value) return "monthly";
  if (validPeriods.has(value as EmissionsChartPeriod)) {
    return value as EmissionsChartPeriod;
  }

  throw new Error("Invalid period");
}

function getScope(value: string | null): EmissionsChartScope {
  if (!value) return "all";
  if (validScopes.has(value as EmissionsChartScope)) {
    return value as EmissionsChartScope;
  }

  throw new Error("Invalid scope");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get("companyId") ?? undefined;

  try {
    const period = getPeriod(searchParams.get("period"));
    const scope = getScope(searchParams.get("scope"));
    const chartData = await fetchEmissionsChart({ companyId, period, scope });

    return Response.json(chartData);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message.startsWith("Invalid") ? 400 : 404;

    return Response.json({ message }, { status });
  }
}
