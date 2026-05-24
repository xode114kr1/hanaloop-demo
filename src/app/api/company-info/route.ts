import { fetchCompanyInfo } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get("companyId") ?? undefined;

  try {
    const companyInfo = await fetchCompanyInfo(companyId);
    return Response.json(companyInfo);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return Response.json({ message }, { status: 404 });
  }
}
