export const useCdn = false;

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2022-11-15";

export const readToken = process.env.SANITY_API_READ_TOKEN || "";

export const DRAFT_MODE_ROUTE = "/api/draft";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
