import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

/**
 * ✅ FUNCIÓN CORREGIDA (DEVUELVE DATOS, NO FUNCIÓN)
 */
export const getCachedGlobal = async <T extends Global>(
  slug: T,
  depth = 0
) => {
  const cachedFn = unstable_cache(
    async () => getGlobal<T>(slug, depth),
    [slug],
    {
      tags: [`global_${slug}`],
    }
  )

  return cachedFn()
}