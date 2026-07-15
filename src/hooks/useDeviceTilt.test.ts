import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { useDeviceTilt } from "./useDeviceTilt";

/** `typeof window` types DeviceOrientationEvent as a required global, so go
 *  through an index signature to stub and delete it. */
const globals = window as unknown as Record<string, unknown>;

/** Install a DeviceOrientationEvent stub; `ios` adds the requestPermission gate. */
function stubSensor({ ios, verdict = "granted" }: { ios: boolean; verdict?: string }) {
  const requestPermission = vi.fn().mockResolvedValue(verdict);
  const DOE: Record<string, unknown> = function () {} as unknown as Record<string, unknown>;
  if (ios) DOE.requestPermission = requestPermission;
  globals.DeviceOrientationEvent = DOE;
  return { requestPermission };
}

function tilt(beta: number, gamma: number) {
  const e = new Event("deviceorientation") as Event & { beta: number; gamma: number };
  e.beta = beta;
  e.gamma = gamma;
  window.dispatchEvent(e);
}

beforeEach(() => {
  Object.defineProperty(window.screen, "orientation", {
    value: { angle: 0 },
    configurable: true,
  });
});

afterEach(() => {
  delete globals.DeviceOrientationEvent;
  vi.restoreAllMocks();
});

describe("useDeviceTilt", () => {
  it("on Android, starts listening without any permission prompt", () => {
    stubSensor({ ios: false });
    const onTilt = vi.fn();
    const { result } = renderHook(() => useDeviceTilt({ enabled: true, onTilt }));

    expect(result.current.needsPermission).toBe(false);
    expect(result.current.granted).toBe(true);

    act(() => tilt(0, 0));
    expect(onTilt).toHaveBeenCalled();
  });

  it("treats the first reading as centre, so a natural holding angle isn't a hard tilt", () => {
    stubSensor({ ios: false });
    const onTilt = vi.fn();
    renderHook(() => useDeviceTilt({ enabled: true, onTilt }));

    // Phone held at a typical 45° reading angle.
    act(() => tilt(45, 0));
    expect(onTilt).toHaveBeenLastCalledWith(0, 0);

    // Tilting 13° right/forward from there is half deflection (RANGE = 26).
    act(() => tilt(45 + 13, 13));
    const [x, y] = onTilt.mock.calls.at(-1)!;
    expect(x).toBeCloseTo(0.5, 5);
    expect(y).toBeCloseTo(0.5, 5);
  });

  it("clamps hard tilts to the -1..1 pointer range", () => {
    stubSensor({ ios: false });
    const onTilt = vi.fn();
    renderHook(() => useDeviceTilt({ enabled: true, onTilt }));

    act(() => tilt(0, 0));
    act(() => tilt(180, 90));
    const [x, y] = onTilt.mock.calls.at(-1)!;
    expect(x).toBe(1);
    expect(y).toBe(1);
  });

  it("on iOS, stays silent until permission is granted via a gesture", async () => {
    const { requestPermission } = stubSensor({ ios: true });
    const onTilt = vi.fn();
    const { result } = renderHook(() => useDeviceTilt({ enabled: true, onTilt }));

    expect(result.current.needsPermission).toBe(true);
    expect(result.current.granted).toBe(false);

    // No listener yet — events must be ignored.
    act(() => tilt(10, 10));
    expect(onTilt).not.toHaveBeenCalled();

    await act(async () => { await result.current.request(); });

    expect(requestPermission).toHaveBeenCalled();
    expect(result.current.granted).toBe(true);
    expect(result.current.needsPermission).toBe(false);

    act(() => tilt(0, 0));
    expect(onTilt).toHaveBeenCalled();
  });

  it("stays off if the user denies the iOS prompt", async () => {
    stubSensor({ ios: true, verdict: "denied" });
    const onTilt = vi.fn();
    const { result } = renderHook(() => useDeviceTilt({ enabled: true, onTilt }));

    await act(async () => { await result.current.request(); });

    expect(result.current.granted).toBe(false);
    act(() => tilt(30, 30));
    expect(onTilt).not.toHaveBeenCalled();
  });

  it("does nothing at all when disabled (desktop / reduced motion)", () => {
    stubSensor({ ios: false });
    const onTilt = vi.fn();
    const { result } = renderHook(() => useDeviceTilt({ enabled: false, onTilt }));

    expect(result.current.granted).toBe(false);
    expect(result.current.needsPermission).toBe(false);
    act(() => tilt(30, 30));
    expect(onTilt).not.toHaveBeenCalled();
  });

  it("remaps axes when the phone is held in landscape", () => {
    stubSensor({ ios: false });
    Object.defineProperty(window.screen, "orientation", {
      value: { angle: 90 },
      configurable: true,
    });
    const onTilt = vi.fn();
    renderHook(() => useDeviceTilt({ enabled: true, onTilt }));

    act(() => tilt(0, 0));
    // In landscape, beta drives left/right and gamma drives up/down (inverted).
    act(() => tilt(13, 0));
    expect(onTilt.mock.calls.at(-1)![0]).toBeCloseTo(0.5, 5);
    act(() => tilt(0, 13));
    expect(onTilt.mock.calls.at(-1)![1]).toBeCloseTo(-0.5, 5);
  });
});
