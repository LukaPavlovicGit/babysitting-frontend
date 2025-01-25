import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { z } from 'zod'
import { parentAccountCompletionSchema, ParentAccountCompletionData } from '@/schemas/parentAccountCompletionSchema'
import { UserTypeEnum } from '@/types/enums/UserTypeEnum'
import {
  BabysitterAccountCompletionData,
  babysitterAccountCompletionSchema,
} from '@/schemas/babysitterAccountCompletionSchema'
import { accountActions } from '@/redux/auth/account.actions'
import { AppDispatch } from '@/redux/store/store'
import { useDispatch } from 'react-redux'

interface AccountCompletionContextType {
  currentStep: number
  parentFormData: Partial<ParentAccountCompletionData>
  updateParentFormData: (data: Partial<ParentAccountCompletionData>) => void
  babysitterFormData: Partial<BabysitterAccountCompletionData>
  updateBabysitterFormData: (data: Partial<BabysitterAccountCompletionData>) => void
  nextStep: () => void
  prevStep: () => void
  isParent: () => boolean
  isBabysitter: () => boolean
  canProceed: boolean
  setUserType: (userType: UserTypeEnum) => void
  getSteps: () => string[]
  errors: z.ZodError | null
  onComplete: () => Promise<void>
}

const AccountCompletionContext = createContext<AccountCompletionContextType | undefined>(undefined)

export const useAccountCompletionContext = () => {
  const context = useContext(AccountCompletionContext)
  if (!context) {
    throw new Error('useAccountCompletion must be used within AccountCompletionProvider')
  }
  return context
}

type AccountCompletionConfig = {
  schemas: z.ZodSchema[]
  steps: string[]
}

export const config: Record<UserTypeEnum, AccountCompletionConfig> = {
  [UserTypeEnum.PARENT]: {
    steps: ['Family Information', 'Schedule & Needs'],
    schemas: [
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
      parentAccountCompletionSchema.pick({
        currency: true,
        rate: true,
        jobLocation: true,
        schedule: true,
        preferebleSkills: true,
      }),
    ],
  },
  [UserTypeEnum.BABYSITTER]: {
    steps: ['Personal Information', 'Experience & Availability'],
    schemas: [
      babysitterAccountCompletionSchema.pick({
        firstName: true,
        postalCode: true,
        addressName: true,
        addressLatitude: true,
        addressLongitude: true,
        speakingLanguages: true,
        skills: true,
      }),
      babysitterAccountCompletionSchema.pick({
        currency: true,
        rate: true,
        jobLocation: true,
        schedule: true,
      }),
    ],
  },
}

export function AccountCompletionProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()
  const [currentStep, setCurrentStep] = useState(-1)
  const [parentFormData, setParentFormData] = useState<Partial<ParentAccountCompletionData>>({})
  const [babysitterFormData, setBabysitterFormData] = useState<Partial<BabysitterAccountCompletionData>>({})
  const [errors, setErrors] = useState<z.ZodError | null>(null)
  const [canProceed, setCanProceed] = useState(false)
  const [userType, setUserType] = useState<UserTypeEnum | null>(null)

  const validateCurrentStep = useCallback(() => {
    try {
      if (currentStep === -1) {
        if (!userType) {
          setCanProceed(false)
          return false
        }
        setCanProceed(true)
        return true
      }

      if (!userType) {
        setCanProceed(false)
        return false
      }

      config[userType].schemas[currentStep].parse(
        userType === UserTypeEnum.PARENT ? parentFormData : babysitterFormData
      )
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
  }, [babysitterFormData, currentStep, parentFormData, userType])

  const updateParentFormData = (data: Partial<ParentAccountCompletionData>) => {
    setParentFormData((prev) => ({ ...prev, ...data }))
    validateCurrentStep()
  }

  const updateBabysitterFormData = (data: Partial<BabysitterAccountCompletionData>) => {
    setBabysitterFormData((prev) => ({ ...prev, ...data }))
    validateCurrentStep()
  }

  const nextStep = () => {
    if (!userType) return
    if (currentStep === -1 || (validateCurrentStep() && currentStep < config[userType].schemas.length - 1)) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > -1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const isParent = () => userType === UserTypeEnum.PARENT

  const isBabysitter = () => userType === UserTypeEnum.BABYSITTER

  const getSteps = () => (userType ? config[userType].steps : [])

  const onComplete = () => {
    if (isParent()) {
      dispatch(accountActions.completeParentAccount(parentFormData as ParentAccountCompletionData))
    } else if (isBabysitter()) {
      dispatch(accountActions.completeBabysitterAccount(babysitterFormData as BabysitterAccountCompletionData))
    } else {
      throw new Error('Invalid user type')
    }
    return Promise.resolve()
  }

  useEffect(() => {
    validateCurrentStep()
  }, [validateCurrentStep])

  const value = {
    currentStep,
    parentFormData,
    updateParentFormData,
    babysitterFormData,
    updateBabysitterFormData,
    nextStep,
    prevStep,
    isParent,
    isBabysitter,
    canProceed,
    setUserType,
    getSteps,
    errors,
    onComplete,
  }

  return <AccountCompletionContext.Provider value={value}>{children}</AccountCompletionContext.Provider>
}
