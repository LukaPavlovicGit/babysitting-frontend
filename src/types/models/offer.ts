import {
  LanguagesEnum,
  CurrencyEnum,
  JobLocationEnum,
  ChildrenAgeCategoryEnum,
  ChildrenCharacteristicsEnum,
  SkillsEnum,
  Schedule,
} from '@/types'

export interface Offer {
  id: string
  createdByRole: number
  createdByUserId: string
  firstName: string
  postalCode: number
  addressName: string
  addressLongitude: number
  addressLatitude: number
  speakingLanguages: LanguagesEnum[]
  skills: SkillsEnum[]
  currency: CurrencyEnum
  rate: number
  jobLocation: JobLocationEnum
  schedule: Schedule
  numberOfChildren: number | null
  childrenAgeCategories: ChildrenAgeCategoryEnum[] | null
  childrenCharacteristics: ChildrenCharacteristicsEnum[] | null
  familyDescription: string | null
}
