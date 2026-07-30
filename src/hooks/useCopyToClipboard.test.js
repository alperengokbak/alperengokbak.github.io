import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCopyToClipboard } from "./useCopyToClipboard.js";

describe("useCopyToClipboard", () => {
  it("starts out not-copied", () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.current[0]).toBe(false);
  });

  it("writes to the clipboard and flips copied to true", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current[1]("gokbakalperen@gmail.com");
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("gokbakalperen@gmail.com");
    expect(result.current[0]).toBe(true);
  });

  it("resets copied to false after resetMs", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const { result } = renderHook(() => useCopyToClipboard(50));

    await act(async () => {
      await result.current[1]("hello");
    });
    expect(result.current[0]).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(50);
    });
    expect(result.current[0]).toBe(false);

    vi.useRealTimers();
  });

  it("falls back to execCommand when the clipboard API rejects", async () => {
    navigator.clipboard.writeText = vi.fn().mockRejectedValue(new Error("denied"));
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current[1]("fallback@example.com");
    });

    await waitFor(() => expect(document.execCommand).toHaveBeenCalledWith("copy"));
    expect(result.current[0]).toBe(true);
    // The temporary textarea must not be left behind in the DOM.
    expect(document.querySelector("textarea")).toBeNull();
  });
});
