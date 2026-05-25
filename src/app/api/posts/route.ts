import { fetchPostsByCompanyId } from "@/lib/api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get("companyId");

  if (!companyId) {
    return Response.json(
      { message: "companyId is required" },
      { status: 400 },
    );
  }

  try {
    const posts = await fetchPostsByCompanyId(companyId);
    return Response.json(posts);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    return Response.json({ message }, { status: 404 });
  }
}
