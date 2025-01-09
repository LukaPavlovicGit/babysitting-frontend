'use client';

import Link from "next/link";
import {LeftArrowSvg} from "../../components/icons/LeftArrow";

function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center border-[1px] border-white p-4 w-full sm:w-1/2 sm:max-w-md gap-6">
            <div className="relative flex flex-row items-center justify-between gap-3 w-full">
                {/* I want to link this button to the login-or-signup page */}
                <Link href="/login-or-signup" className="bg-white text-black p-2">
                    <LeftArrowSvg/>
                </Link>
                <h2 className="absolute text-2xl font-bold left-1/2 -translate-x-1/2">Welcome, John</h2>
            </div>
            <div className="w-full text-white text-center">{`tteeeeeesssssssst@gmail.com`}</div>
            <form className="flex flex-col items-center justify-center gap-3 w-full">
                <input type="password" placeholder="Password" className="w-full p-2 text-black"/>
                <button className="bg-green-500 text-black px-2 py-1 w-full">Login</button>
            </form>
            <Link href="/forgot-password" className="text-white text-left w-full underline">Forgot password?</Link>
            <div className="flex items-center justify-center w-full gap-3">
                <button className="bg-white text-black p-2">Apple</button>
                <button className="bg-white text-black p-2">Facebook</button>
                <button className="bg-white text-black p-2">Google</button>
            </div>
        </div>
    </div>
  )
}

export default LoginPage;
