// components/InnerNav.tsx
'use client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface InnerNavProps {
  leftLabel?: string
  leftHref?: string
  rightLabel?: string
  rightHref?: string
}

export default function InnerNav({
  leftLabel = 'Početna',
  leftHref = '/',
  rightLabel,
  rightHref,
}: InnerNavProps) {
  return (
    <div className="flex items-center justify-between pb-3 md:pb-5">
      <Link
        href={leftHref}
        className="flex items-center font-light gap-2 text-base md:text-lg lg:text-xl text-stone-400 hover:text-secondary transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {leftLabel}
      </Link>

      {rightLabel && rightHref && (
        <Link
          href={rightHref}
          className="flex items-center gap-2 text-base md:text-xl lg:text-xl text-stone-400 hover:text-secondary transition-colors group"
        >
          {rightLabel}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  )
}
