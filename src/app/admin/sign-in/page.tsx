import { SignIn } from '@clerk/nextjs'

export default function AdminSignInPage() {
  return (
    <div className="min-h-screen bg-shadow flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/landman-logo-wide.svg"
          alt="Landman Auctions"
          className="h-10 w-auto mx-auto mb-4 invert"
        />
        <p className="text-offwhite/40 text-xs tracking-widest uppercase">Admin Access</p>
      </div>
      <SignIn
        forceRedirectUrl="/admin"
        appearance={{
          variables: {
            colorBackground: '#2a2848',
            colorText: '#F6F3EC',
            colorPrimary: '#FF9500',
            colorInputBackground: '#201E3D',
            colorInputText: '#F6F3EC',
            borderRadius: '0px',
          },
          elements: {
            card: 'shadow-none',
            footer: 'hidden',
          },
        }}
      />
    </div>
  )
}
