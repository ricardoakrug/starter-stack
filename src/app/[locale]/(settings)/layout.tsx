import Sidebar from "@/components/settings/sidebar/sidebar";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return <Sidebar>{children}</Sidebar>;
}
