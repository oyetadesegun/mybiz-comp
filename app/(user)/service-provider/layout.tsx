import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (<div>
     <main className='bg-gray-50'>
        {children}
      </main>
    </div>
  )
}
