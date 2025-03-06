import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { z } from 'zod'
import { accountCompletionSchema, AccountCompletionData } from '@/schemas/accountCompletionSchena'
import { UserTypeEnum } from '@/types/enums/UserTypeEnum'

interface AccountCompletionContextType {
  currentStep: number
  accountCompletionData: Partial<AccountCompletionData>
  updateAccountCompletionData: (data: Partial<AccountCompletionData>) => void
  nextStep: () => void
  prevStep: () => void
  getSteps: () => string[]
  isParent: boolean
  isBabysitter: boolean
  canProceed: boolean
  errors: z.ZodError | null
}

const AccountCompletionContext = createContext<AccountCompletionContextType | undefined>(undefined)

export const useAccountCompletionContext = () => {
  const context = useContext(AccountCompletionContext)
  if (!context) {
    throw new Error('useAccountCompletion must be used within AccountCompletionProvider')
  }
  return context
}

const stepsConfig = {
  [UserTypeEnum.PARENT]: {
    stepsTitles: ['Who am I?', 'Personal Information', 'Schedule & Needs', 'Family Information'],
    schemas: [
      accountCompletionSchema.pick({ createdByRole: true }),
      accountCompletionSchema.pick({
        firstName: true,
        postalCode: true,
        addressName: true,
        addressLatitude: true,
        addressLongitude: true,
        speakingLanguages: true,
      }),
      accountCompletionSchema.pick({
        currency: true,
        rate: true,
        jobLocation: true,
        schedule: true,
        skills: true,
      }),
      accountCompletionSchema.pick({
        numberOfChildren: true,
        childrenAgeCategories: true,
        childrenCharacteristics: true,
        familyDescription: true,
      }),
    ],
  },
  [UserTypeEnum.BABYSITTER]: {
    stepsTitles: ['Who am I?', 'Personal Information', 'Schedule & Skills'],
    schemas: [
      accountCompletionSchema.pick({ createdByRole: true }),
      accountCompletionSchema.pick({
        firstName: true,
        postalCode: true,
        addressName: true,
        addressLatitude: true,
        addressLongitude: true,
        speakingLanguages: true,
      }),
      accountCompletionSchema.pick({
        currency: true,
        rate: true,
        jobLocation: true,
        schedule: true,
        skills: true,
      }),
    ],
  },
}

export function AccountCompletionProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [accountCompletionData, setAccountCompletionData] = useState<Partial<AccountCompletionData>>({
    createdByRole: UserTypeEnum.PARENT,
  })
  const [errors, setErrors] = useState<z.ZodError | null>(null)
  const [canProceed, setCanProceed] = useState(false)

  const validateCurrentStep = useCallback(() => {
    try {
      const role = accountCompletionData.createdByRole!
      const schema = stepsConfig[role].schemas[currentStep]
      schema.parse(accountCompletionData)
      setErrors(null)
      setCanProceed(true)
      return true
    } catch (error) {
      console.log(error)
      if (error instanceof z.ZodError) {
        setErrors(error)
      }
      setCanProceed(false)
      return false
    }
  }, [accountCompletionData, currentStep])

  const updateAccountCompletionData = (data: Partial<AccountCompletionData>) => {
    setAccountCompletionData((prev) => ({ ...prev, ...data }))
    validateCurrentStep()
  }

  const nextStep = () => {
    if (!accountCompletionData || !accountCompletionData.createdByRole) return
    if (
      validateCurrentStep() &&
      currentStep < stepsConfig[accountCompletionData.createdByRole].stepsTitles.length - 1
    ) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > -1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const getSteps = () => {
    return stepsConfig[accountCompletionData.createdByRole!].stepsTitles
  }

  useEffect(() => {
    validateCurrentStep()
  }, [validateCurrentStep])

  const value = {
    currentStep,
    accountCompletionData,
    updateAccountCompletionData,
    nextStep,
    prevStep,
    getSteps,
    isParent: accountCompletionData.createdByRole === UserTypeEnum.PARENT,
    isBabysitter: accountCompletionData.createdByRole === UserTypeEnum.BABYSITTER,
    canProceed,
    errors,
  }

  return <AccountCompletionContext.Provider value={value}>{children}</AccountCompletionContext.Provider>
}
