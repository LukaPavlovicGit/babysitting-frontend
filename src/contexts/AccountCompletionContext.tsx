import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { z } from 'zod'
import { parentAccountCompletionSchema, ParentAccountCompletionData } from '@/schemas/parentAccountCompletionSchema'
import { UserTypeEnum } from '@/types/enums/UserTypeEnum'
import { BabysitterAccountCompletionData } from '@/schemas/babysitterAccountCompletionSchema'

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

type StepConfig = {
  stepNumber: number
  validationSchema: z.ZodSchema
  title: string
}

type AccountSetupConfig = {
  totalSteps: number
  steps: StepConfig[]
}

const config: Record<UserTypeEnum, AccountSetupConfig> = {
  [UserTypeEnum.PARENT]: {
    totalSteps: 3,
    steps: [
      {
        stepNumber: 1,
        title: 'User Type',
        validationSchema: parentAccountCompletionSchema.pick({
          userType: true,
        }),
      },
      {
        stepNumber: 2,
        title: 'Family Information',
        validationSchema: parentAccountCompletionSchema.pick({
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
      },
      {
        stepNumber: 3,
        title: 'Schedule & Needs',
        validationSchema: parentAccountCompletionSchema.pick({
          currency: true,
          rate: true,
          jobLocation: true,
          schedule: true,
          preferebleSkills: true,
        }),
      },
    ],
  },
  [UserTypeEnum.BABYSITTER]: {
    totalSteps: 3,
    steps: [
      {
        stepNumber: 1,
        title: 'User Type',
        validationSchema: parentAccountCompletionSchema.pick({}),
      },
      {
        stepNumber: 2,
        title: 'Personal Information',
        validationSchema: parentAccountCompletionSchema.pick({
          // Add babysitter specific fields
        }),
      },
      {
        stepNumber: 3,
        title: 'Experience & Availability',
        validationSchema: parentAccountCompletionSchema.pick({
          // Add babysitter specific fields
        }),
      },
    ],
  },
}

// Helper function with enum type
const getStepperConfig = (userType: UserTypeEnum): AccountSetupConfig => {
  return config[userType]
}

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
  const [parentFormData, setParentFormData] = useState<Partial<ParentAccountCompletionData>>({})
  const [babysitterFormData, setBabysitterFormData] = useState<Partial<BabysitterAccountCompletionData>>({})
  const [errors, setErrors] = useState<z.ZodError | null>(null)
  const [canProceed, setCanProceed] = useState(false)
  const [userType, setUserType] = useState<UserTypeEnum | null>(null)

  const validateCurrentStep = useCallback(() => {
    try {
      if (!userType) return false

      config[userType].steps[currentStep].validationSchema.parse(parentFormData)
      stepValidationSchemas[currentStep].parse(parentFormData)
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
  }, [currentStep, parentFormData, userType])

  const updateParentFormData = (data: Partial<ParentAccountCompletionData>) => {
    setParentFormData((prev) => ({ ...prev, ...data }))
    validateCurrentStep()
  }

  const updateBabysitterFormData = (data: Partial<BabysitterAccountCompletionData>) => {
    setBabysitterFormData((prev) => ({ ...prev, ...data }))
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

  const isParent = () => parentFormData.userType === UserTypeEnum.PARENT

  const isBabysitter = () => parentFormData.userType === UserTypeEnum.BABYSITTER

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
    errors,
  }

  return <AccountCompletionContext.Provider value={value}>{children}</AccountCompletionContext.Provider>
}
