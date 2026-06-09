import { render } from "@testing-library/svelte";
import { describe, it, expect } from "vitest";
import Page from "./+page.svelte";
import { fakeGameStats, FAKE_LAST_WEEK } from "../lib/fake-game-stats";

describe("Home Page Snapshot", () => {
  it("matches the snapshot", () => {
    const { container } = render(Page as any, {
      props: {
        data: {
          gameStats: fakeGameStats,
          lastWeek: FAKE_LAST_WEEK,
        },
      }
    });
    expect(container).toMatchSnapshot();
  });
});
