import { renderHook } from "@testing-library/react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { useStrongDevice } from "./useStrongDevice";

function stubNavigator(props: Record<string, unknown>) {
  for (const [key, value] of Object.entries(props)) {
    Object.defineProperty(navigator, key, { value, configurable: true });
  }
}

afterEach(() => {
  for (const key of ["deviceMemory", "hardwareConcurrency", "connection"]) {
    Object.defineProperty(navigator, key, { value: undefined, configurable: true });
  }
  vi.restoreAllMocks();
});

describe("useStrongDevice", () => {
  it("accepts a modern high-core phone", () => {
    stubNavigator({ deviceMemory: 8, hardwareConcurrency: 8 });
    expect(renderHook(() => useStrongDevice()).result.current).toBe(true);
  });

  it("rejects a low-core budget phone", () => {
    stubNavigator({ deviceMemory: 4, hardwareConcurrency: 4 });
    expect(renderHook(() => useStrongDevice()).result.current).toBe(false);
  });

  it("rejects a low-memory phone even with many cores", () => {
    stubNavigator({ deviceMemory: 2, hardwareConcurrency: 8 });
    expect(renderHook(() => useStrongDevice()).result.current).toBe(false);
  });

  // iOS Safari never exposes deviceMemory; absence must not read as "weak",
  // or no iPhone would ever get the 3D emblem.
  it("does not penalise iOS for omitting deviceMemory", () => {
    stubNavigator({ deviceMemory: undefined, hardwareConcurrency: 6 });
    expect(renderHook(() => useStrongDevice()).result.current).toBe(true);
  });

  it("respects Save-Data regardless of how fast the device is", () => {
    stubNavigator({
      deviceMemory: 8,
      hardwareConcurrency: 8,
      connection: { saveData: true },
    });
    expect(renderHook(() => useStrongDevice()).result.current).toBe(false);
  });
});
