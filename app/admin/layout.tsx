import type { Metadata } from "next"
import { AdminDashboardLayout } from "./components/layout/AdminDashboardLayout"

export const metadata: Metadata = {
  title: "Admin | Eureka",
  description: "Eureka Admin Dashboard",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>
}
