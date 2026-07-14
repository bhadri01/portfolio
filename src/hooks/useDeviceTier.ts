import { useEffect, useState } from 'react'

export type DeviceTier = 'high' | 'medium' | 'low'

/** Coarse device capability estimate used to scale particle count / DPR. */
export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('high')
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number }
    const mem = nav.deviceMemory ?? 8
    const cores = navigator.hardwareConcurrency ?? 8
    const mobile = window.matchMedia('(max-width: 768px)').matches
    if (mem <= 2 || cores <= 2) setTier('low')
    else if (mobile || mem <= 4 || cores <= 4) setTier('medium')
    else setTier('high')
  }, [])
  return tier
}
