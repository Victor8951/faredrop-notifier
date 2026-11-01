import { QueryClient } from "@tanstack/react-query";
import { matchRoutes } from "react-router";
import { describe, expect, it } from "vitest";

import { createRoutes } from "@/router";

// Match routes without running loaders or rendering: loaders may need a network
// the test run lacks, and jsdom never loads the stylesheets React waits on.
function leafPath(pathname: string) {
  const matches = matchRoutes(createRoutes(new QueryClient()), pathname);
  return matches?.at(-1)?.route.path;
}

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const matches = matchRoutes(createRoutes(new QueryClient()), "/");
    expect(matches?.at(-1)?.route.index).toBe(true);
  });

  it.each(["app", "signin", "signup", "sign-in", "sign-up"])("matches /%s", (path) => {
    expect(leafPath(`/${path}`)).toBe(path);
  });

  it("falls back to not found for unknown paths", () => {
    expect(leafPath("/nope")).toBe("*");
  });
});
