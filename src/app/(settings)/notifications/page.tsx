import { auth } from "@/lib/actions/auth/auth";
import type { User } from "@/lib/types/auth";
import NotificationsForm from "@/components/settings/profile/notifications-form";

export default async function NotificationsPage() {
  const session = await auth();
  const user = session?.user as User | undefined;

  if (!user) {
    return (
      <div className="flex min-h-[90vh] flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Please log in to view your notification settings
          </h1>
          <p className="mt-2 text-muted-foreground">
            You need to be authenticated to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notification Settings</h1>
        <p className="text-muted-foreground">
          Manage your notification preferences and communication settings.
        </p>
      </div>

      <NotificationsForm />
    </div>
  );
}
