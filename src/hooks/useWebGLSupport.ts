import { useEffect, useState } from 'react'

/** null = still checking, true/false = result. Used to pick the 3D scene vs a static fallback. */
export function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null)
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      setSupported(Boolean(gl))
    } catch {
      setSupported(false)
    }
  }, [])
  return supported
}
