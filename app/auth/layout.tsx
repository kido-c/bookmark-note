import React from 'react'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-full flex justify-center items-center">
      <section className=" w-96 h-96">
        {/* <h1 className="text-3xl text-center">Auth Layout</h1> */}
        {children}
      </section>
    </div>
  )
}
