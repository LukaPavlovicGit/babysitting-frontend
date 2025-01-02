'use client';

import FormField from "@/components/FormField";
import { useGetAccountByEmail } from "@/hooks/api/useGetAccountByEmail";
import { LoginOrSignupData, loginOrSignupSchema } from '@/schemas/loginOrSignupSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function LoginOrSignupPage() {

  const { 
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginOrSignupData>({
    resolver: zodResolver(loginOrSignupSchema)
  });
  const { mutate } = useGetAccountByEmail();

  const onSubmit = handleSubmit((data) => {
    mutate(data.email);
  });


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center border-[1px] border-white p-4 w-full sm:w-1/2 sm:max-w-md gap-6">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <form onSubmit={onSubmit} className="flex flex-col size-full gap-3">
          <p className="text-sm text-gray-500">Log in or sign up</p>
          <FormField
            type="text"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email}
            className="px-2 py-1 text-black "
          />
          <button className="bg-yellow-500 text-black px-2 py-1">Continue</button>
        </form>
        <div className="flex items-center justify-center w-full">
          <p className="text-sm text-gray-500 ">or continue with</p>
        </div>
        <div className="flex items-center justify-center w-full gap-3">
          <button className="bg-white text-black p-2">Apple</button>
          <button className="bg-white text-black p-2">Facebook</button>
          <button className="bg-white text-black p-2">Google</button>
        </div>
      </div>
    </div>
  );
}

export default LoginOrSignupPage;


