import MainForm from '@/components/MainForm'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('create')

  return (
    <main className='w-full'>
      
    </main>
  )
}
