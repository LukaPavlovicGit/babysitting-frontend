'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { AccountCompletionProvider } from '@/contexts/AccountCompletionContext'
import { createPortal } from 'react-dom'
import AccountCompletionStepper from './AccountCompletionStepper'

export default function DelayedAccountCompletionStepper() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const isLoggedIn = useSelector((state: RootState) => state.account.isLoggedIn)
  const isAccountCompleted = useSelector((state: RootState) => state.account.isAccountCompleted)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    console.log('pathname: ' + pathname)
    console.log('isLoggedIn: ' + isLoggedIn)
    console.log('isAccountComplete: ' + isAccountCompleted)

    const doNotShow = !isLoggedIn || isAccountCompleted || /^\/*(login|signup)/.test(pathname)

    console.log('doNotShow: ' + doNotShow)

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
    <div className="flex items-top justify-center fixed inset-0 z-50 bg-black bg-opacity-50 p-10 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col items-end gap-2">
        <button onClick={handleDismiss} className="text-gray-500 hover:text-gray-700">
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
