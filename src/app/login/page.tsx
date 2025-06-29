'use client'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store/store'
import { selectors } from '@/redux/selectors'
import { actions } from '@/redux/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { LoginData, loginSchema } from '@/schemas/auth/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import FormField from '@/components/FormField'
import Icon from '@/components/Icon'

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const email = useSelector(selectors.getEmail)
  const firstName = useSelector(selectors.getFirstName)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: email || '',
    },
  })

  const onSubmit = handleSubmit(async (data: LoginData) => {
    try {
      await dispatch(actions.login(data))
      await dispatch(actions.getData())
      router.push('/home')
    } catch (error) {
      console.error('Login failed:', error)
    }
  })

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center border-[1px] border-white p-4 w-full sm:w-1/2 sm:max-w-md gap-6">
        <div className="relative flex flex-row items-center justify-between gap-3 w-full">
          <Link href="/" className="bg-white text-black p-2">
            <Icon name="LeftArrowSvg" />
          </Link>
          <h2 className="absolute text-2xl font-bold left-1/2 -translate-x-1/2">Welcome, {firstName}</h2>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col items-center justify-center gap-3 w-full">
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
          <button className="bg-green-500 text-black px-2 py-1 w-full">Login</button>
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

export default LoginPage
