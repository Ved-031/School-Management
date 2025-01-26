"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from '@clerk/nextjs';
import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';


export default function Page() {

  const { isLoaded, user, isSignedIn } = useUser();

  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router])

  return (
    <div className='w-[90%] md:w-[70%] lg:w-[30%]'>
      <SignIn.Root>
        <SignIn.Step
          name='start'
          className='bg-white rounded-xl p-7 shadow-lg flex flex-col items-start'
        >
          <header className='flex flex-col gap-2 items-center mb-5 text-center mx-auto'>
            <Link href="/" className='flex items-center gap-2'>
              <Image src="/logo.png" alt='' width={30} height={30} />
              <h1 className='text-2xl font-bold'>School<span className='text-blue-500'>Pro</span></h1>
            </Link>
            <p className='text-sm text-gray-500'>Sign in to your account</p>
          </header>
          <Clerk.GlobalError className='text-sm text-red-600' />
          <div className='flex flex-col items-start w-full gap-4'>
            <div className='w-full'>
              <Clerk.Field name="identifier" className='flex flex-col items-start gap-1 w-full'>
                <Clerk.Label className=''>Username</Clerk.Label>
                <Clerk.Input
                  type="text"
                  required
                  className='border border-gray-300 rounded-md px-3 py-2 w-full'
                />
                <Clerk.FieldError className='text-sm text-red-400 mt-1' />
              </Clerk.Field>
            </div>
            <div className='w-full'>
              <Clerk.Field name="password" className='flex flex-col items-start gap-1 w-full'>
                <Clerk.Label className=''>Password</Clerk.Label>
                <Clerk.Input
                  type='password'
                  placeholder='********'
                  required
                  className='border border-gray-300 rounded-md px-3 py-2 w-full'
                />
                <Clerk.FieldError className='text-sm text-red-400 mt-1' />
              </Clerk.Field>
            </div>
          </div>
          <SignIn.Action
            submit
            className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-500/85 transition-all duration-300 mt-6"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  )
}