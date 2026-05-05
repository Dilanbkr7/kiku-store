import clsx from 'clsx'
import React from 'react'

export function Grid(props: React.ComponentProps<'div'>) {
  const { children, className, ...rest } = props

  return (
    <div {...rest} className={clsx('grid grid-flow-row gap-4', className)}>
      {children}
    </div>
  )
}