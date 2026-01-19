import { DashboardLayout } from "@/components/layout/DashboardLayout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin | Eureka",
  description: "Eureka Admin Dashboard",
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
