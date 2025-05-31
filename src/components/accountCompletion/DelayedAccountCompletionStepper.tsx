'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AccountCompletionProvider } from '@/contexts/AccountCompletionContext'
import { createPortal } from 'react-dom'
import AccountCompletionStepper from './AccountCompletionStepper'
import { selectors } from '@/redux/selectors'
import { useSelector } from 'react-redux'

export default function DelayedAccountCompletionStepper() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const isLoggedIn = useSelector(selectors.getIsLoggedIn)
  const isAccountCompleted = useSelector(selectors.getIsAccountCompleted)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    const excludedRoutes = /^\/*(login|signup)/.test(pathname)
    const doNotShow = excludedRoutes || (isLoggedIn && isAccountCompleted)

    if (doNotShow) {
      setShow(false)
      return
    }

    const DISPLAY_DELAY = 5000 // 5 seconds
    const STORAGE_KEY = 'stepperDismissedAt'

    const checkDismissalTime = () => {
      const dismissedAt = localStorage.getItem(STORAGE_KEY)
      if (!dismissedAt) return true

      const timeSinceDismissal = Date.now() - parseInt(dismissedAt)
      return timeSinceDismissal >= DISPLAY_DELAY
    }

    const showStepper = () => {
      if (checkDismissalTime()) {
        setShow(true)
      }
    }

    const timer = setTimeout(showStepper, DISPLAY_DELAY)
    const interval = setInterval(() => {
      if (!show && checkDismissalTime()) {
        setShow(true)
      }
    }, DISPLAY_DELAY)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [isAccountCompleted, isLoggedIn, pathname, show])

  const handleDismiss = () => {
    setShow(false)
    localStorage.setItem('stepperDismissedAt', Date.now().toString())
  }

  if (!mounted || !show) return null

  return createPortal(
    <div className="flex items-top justify-center fixed inset-0 z-[9999] bg-black bg-opacity-50 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col items-end gap-2 p-10 w-full max-w-7xl">
        <button onClick={handleDismiss} className="text-white font-medium text-2xl hover:text-gray-700">
          <span>SKIP</span>
        </button>
        <AccountCompletionProvider>
          <AccountCompletionStepper />
        </AccountCompletionProvider>
      </div>
    </div>,
    document.body
  )
}
