import '@/styles/globals.css'
import SideBar from '../components/SideBar'
import Login from '../components/Login'
import { SessionProvider } from '../components/SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import ClientProvider from 'components/ClientProvider'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
          <div className="flex">
            {/* Sidebar */}
            <div className="md:w-[16rem] bg-zinc-800 max-w-xs h-screen overflow-y-auto">
              <SideBar />
            </div>

            {/* Client Provider - Notification */}
            <ClientProvider />


            <div className="bg-zinc-900 flex-1 ">{children}</div>
          </div>            
          )}

        </SessionProvider>
      </body>
    </html>
  )
}