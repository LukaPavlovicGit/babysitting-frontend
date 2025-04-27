import { ChildrenAgeCategoryEnum } from '@/types/enums/ChildrenAgeCategoryEnum'
import { ChildrenCharacteristicsEnum } from '@/types/enums/ChildrenCharacteristicsEnum'
import { CurrencyEnum } from '@/types/enums/CurrencyEnum'
import { JobLocationEnum } from '@/types/enums/JobLocationEnum'
import { LanguagesEnum } from '@/types/enums/LanguagesEnum'
import { SkillsEnum } from '@/types/enums/SkillsEnum'
import { RoleEnum } from '@/types/enums/RoleEnum'
import { z } from 'zod'

export const accountCompletionSchema = z.object({
  // first step
  createdByRole: z.nativeEnum(RoleEnum, { message: 'User type must be picked' }).default(RoleEnum.PARENT),
  createdByUserId: z.string().min(1).default('read_user_id_from_jwt'),
  // second step
  postalCode: z.number().min(1, { message: 'Postal code must be a number' }),
  firstName: z.string().min(1, { message: 'First name must be picked' }),
  addressName: z.string().min(1, { message: 'Address name must be picked' }),
  addressLongitude: z
    .number()
    .min(-180)
    .max(180)
    .refine((value) => !isNaN(value), { message: 'Longitude must be a number' }),
  addressLatitude: z
    .number()
    .min(-90)
    .max(90)
    .refine((value) => !isNaN(value), { message: 'Latitude must be a number' }),
  speakingLanguages: z
    .array(z.nativeEnum(LanguagesEnum))
    .min(1, { message: 'At least one family speaking language must be picked' })
    .max(3, { message: 'At most 3 family speaking languages can be picked' }),
  // third step
  currency: z.nativeEnum(CurrencyEnum, { message: 'Currency must be picked' }),
  rate: z.number().min(0, { message: 'Rate must be a positive number' }),
  skills: z.array(z.nativeEnum(SkillsEnum)).optional(),
  jobLocation: z.nativeEnum(JobLocationEnum, { message: 'Job location must be picked' }),
  schedule: z.object({
    mondayMorning: z.boolean().default(false),
    mondayAfternoon: z.boolean().default(false),
    mondayEvening: z.boolean().default(false),
    mondayNight: z.boolean().default(false),
    tuesdayMorning: z.boolean().default(false),
    tuesdayAfternoon: z.boolean().default(false),
    tuesdayEvening: z.boolean().default(false),
    tuesdayNight: z.boolean().default(false),
    wednesdayMorning: z.boolean().default(false),
    wednesdayAfternoon: z.boolean().default(false),
    wednesdayEvening: z.boolean().default(false),
    wednesdayNight: z.boolean().default(false),
    thursdayMorning: z.boolean().default(false),
    thursdayAfternoon: z.boolean().default(false),
    thursdayEvening: z.boolean().default(false),
    thursdayNight: z.boolean().default(false),
    fridayMorning: z.boolean().default(false),
    fridayAfternoon: z.boolean().default(false),
    fridayEvening: z.boolean().default(false),
    fridayNight: z.boolean().default(false),
    saturdayMorning: z.boolean().default(false),
    saturdayAfternoon: z.boolean().default(false),
    saturdayEvening: z.boolean().default(false),
    saturdayNight: z.boolean().default(false),
    sundayMorning: z.boolean().default(false),
    sundayAfternoon: z.boolean().default(false),
    sundayEvening: z.boolean().default(false),
    sundayNight: z.boolean().default(false),
  }),
  // fourth step
  numberOfChildren: z.number().min(1, { message: 'At least one child must be picked' }).default(0),
  childrenAgeCategories: z
    .array(z.nativeEnum(ChildrenAgeCategoryEnum))
    .min(1, { message: 'At least one age category must be picked' }),
  childrenCharacteristics: z
    .array(z.nativeEnum(ChildrenCharacteristicsEnum))
    .min(1, { message: 'At least one child characteristic must be picked' })
    .max(4, { message: 'At most 4 child characteristics can be picked' }),
  familyDescription: z.string().min(20, { message: 'Family description must be picked' }),
  photoUrl: z.string().optional(),
  subscribeToJobNotifications: z.boolean().optional(),
})

export type AccountCompletionData = z.infer<typeof accountCompletionSchema>
