import { revalidateTag } from "next/cache";

/**
 * Revalidate portfolio content cached in the public data layer.
 * Uses "max" profile to purge immediately across all instances.
 */
export function revalidatePortfolioContent(): void {
  revalidateTag("portfolio-content", "max");
}
