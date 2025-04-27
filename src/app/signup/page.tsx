'use client'

import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store/store'
import { useRouter } from 'next/navigation'
import { SignupData, signupSchema } from '@/schemas/auth/signupSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import FormField from '@/components/FormField'
import Icon from '@/components/Icon'
import { actions } from '@/redux/actions'

function SignupPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(actions.signup(data))
      router.push('/login')
    } catch (error) {}
  })

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center border-[1px] border-white p-4 w-full sm:w-1/2 sm:max-w-md gap-6">
        <div className="relative flex flex-row items-center justify-between gap-3 w-full">
          <Link href="/login-or-signup" className="bg-white text-black p-2">
            <Icon name="LeftArrowSvg" />
          </Link>
          <h2 className="absolute text-2xl font-bold left-1/2 -translate-x-1/2">Sign Up</h2>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col items-center justify-center gap-3 w-full">
          <FormField
            type="text"
            placeholder="First Name"
            name="firstName"
            register={register}
            error={errors.firstName}
            className="w-full px-2 py-1 text-black "
          />
          <FormField
            type="text"
            placeholder="Last Name"
            name="lastName"
            register={register}
            error={errors.lastName}
            className="w-full px-2 py-1 text-black "
          />
          <FormField
            type="text"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
            className="w-full px-2 py-1 text-black "
          />
          <FormField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password}
            className="w-full px-2 py-1 text-black "
          />
          <button className="bg-green-500 text-black px-2 py-1 w-full">Sign Up</button>
        </form>
        <Link href="/forgot-password" className="text-white text-left w-full underline">
          Forgot password?
        </Link>
        <div className="flex items-center justify-center w-full gap-3">
          <button className="bg-white text-black p-2">Apple</button>
          <button className="bg-white text-black p-2">Facebook</button>
          <button className="bg-white text-black p-2">Google</button>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
