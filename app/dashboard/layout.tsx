import { DashboardLayout } from "@/components/layout/DashboardLayout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | Eureka Admin",
  description: "Manage your events and tickets",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
