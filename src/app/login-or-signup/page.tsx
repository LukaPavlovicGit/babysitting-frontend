function LoginOrSignupPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center border-[1px] border-white p-4 w-full sm:w-1/2 sm:max-w-md gap-6">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <div className="flex flex-col size-full gap-3">
          <p className="text-sm text-gray-500">Log in or sign up</p>
          <input type="text" placeholder="Email" className="px-2 py-1 text-black" />
          <button className="bg-yellow-500 text-black px-2 py-1">Continue</button>
        </div>
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
