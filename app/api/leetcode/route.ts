import { NextRequest, NextResponse } from "next/server";

const apiEndpoints = [
  "https://leetcode-stats-api.vercel.app",
  "https://leetcode-stats-api.herokuapp.com",
  "https://leetcode-stats-api.netlify.app",
];

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username")?.trim() || "Mr_Rock";

  for (const base of apiEndpoints) {
    try {
      const response = await fetch(`${base}/${encodeURIComponent(username)}`, {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (!response.ok) continue;

      const payload = await response.json();
      return NextResponse.json(payload);
    } catch {
      continue;
    }
  }

  return NextResponse.json(
    {
      error: "LeetCode stats unavailable",
      totalSolved: 0,
      totalQuestions: 0,
      easySolved: 0,
      totalEasy: 0,
      mediumSolved: 0,
      totalMedium: 0,
      hardSolved: 0,
      totalHard: 0,
    },
    { status: 200 }
  );
}
