import { getCachedGlobal } from '@/utilities/getGlobals'

import { HeaderClient } from './index.client'
import './index.css'

export async function Header() {
  // ✅ YA NO LLEVA () AL FINAL
  const headerData = await getCachedGlobal('header', 1)

  // 🛡️ Seguridad
  if (!headerData) return null

  return (
    <header className="site-header">
      <HeaderClient header={headerData} />
    </header>
  )
}