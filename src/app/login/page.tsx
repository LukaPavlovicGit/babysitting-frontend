'use client'

import { useDispatch } from 'react-redux'
import { AppDispatch, store, RootReducerState } from '@/redux/store/store'
import { authSelectors } from '@/redux/auth/auth.selectors'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { LoginData, loginSchema } from '@/schemas/auth/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import FormField from '@/components/FormField'
import { authActions } from '@/redux/auth/auth.actions'
import Icon from '@/components/Icon'

function LoginPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const email = authSelectors.getEmail(store.getState() as RootReducerState)
  const firstName = authSelectors.getFirstName(store.getState() as RootReducerState)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit(async (data: LoginData) => {
    try {
      await dispatch(authActions.login(data))
      router.push('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  })

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center border-[1px] border-white p-4 w-full sm:w-1/2 sm:max-w-md gap-6">
        <div className="relative flex flex-row items-center justify-between gap-3 w-full">
          <Link href="/login-or-signup" className="bg-white text-black p-2">
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
            value={email || ''}
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
