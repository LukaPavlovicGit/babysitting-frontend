import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { z } from 'zod'
import { parentAccountCompletionSchema, ParentAccountCompletionData } from '@/schemas/parentAccountCompletionSchema'
import { UserTypeEnum } from '@/types/enums/UserTypeEnum'

interface AccountCompletionContextType {
  currentStep: number
  formData: Partial<ParentAccountCompletionData>
  updateFormData: (data: Partial<ParentAccountCompletionData>) => void
  nextStep: () => void
  prevStep: () => void
  isParent: () => boolean
  isBabysitter: () => boolean
  canProceed: boolean
  errors: z.ZodError | null
}

const AccountCompletionContext = createContext<AccountCompletionContextType | undefined>(undefined)

export const useAccountCompletion = () => {
  const context = useContext(AccountCompletionContext)
  if (!context) {
    throw new Error('useAccountCompletion must be used within AccountCompletionProvider')
  }
  return context
}

const config = {}

const stepValidationSchemas = [
  // Step 1: User Type
  parentAccountCompletionSchema.pick({ userType: true }),
  // Step 2: Family Information
  parentAccountCompletionSchema.pick({
    firstName: true,
    postalCode: true,
    addressName: true,
    addressLatitude: true,
    addressLongitude: true,
    familySpeakingLanguages: true,
    numberOfChildren: true,
    childrenAgeCategories: true,
    childrenCharacteristics: true,
    familyDescription: true,
  }),
  // Step 3: Schedule/Needs
  parentAccountCompletionSchema.pick({
    currency: true,
    rate: true,
    jobLocation: true,
    schedule: true,
    preferebleSkills: true,
  }),
]

export function AccountCompletionProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<ParentAccountCompletionData>>({})
  const [errors, setErrors] = useState<z.ZodError | null>(null)
  const [canProceed, setCanProceed] = useState(false)
  const [userType, setUserType = () => {}] = useState<UserTypeEnum | null>(null)

  const validateCurrentStep = useCallback(() => {
    try {
      stepValidationSchemas[currentStep].parse(formData)
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
  }, [currentStep, formData])

  const updateFormData = (data: Partial<ParentAccountCompletionData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    validateCurrentStep()
  }

  const nextStep = () => {
    if (validateCurrentStep() && currentStep < stepValidationSchemas.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      invalidateCurrentStep()
    }
  }

  const invalidateCurrentStep = () => {
    stepValidationSchemas[currentStep].parse({})
  }

  const isParent = () => formData.userType === UserTypeEnum.PARENT

  const isBabysitter = () => formData.userType === UserTypeEnum.BABYSITTER

  useEffect(() => {
    validateCurrentStep()
  }, [validateCurrentStep])

  const value = {
    currentStep,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    isParent,
    isBabysitter,
    canProceed,
    errors,
  }

  return <AccountCompletionContext.Provider value={value}>{children}</AccountCompletionContext.Provider>
}
