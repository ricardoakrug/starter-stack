import { auth } from '@/lib/actions/auth/auth';
import type { User } from '@/lib/types/auth';
import ProfileForm from '@/components/settings/profile/profile-form';

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user as User | undefined;

  if (!user) {
    return (
      <div className="flex min-h-[90vh] flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Please log in to view your profile</h1>
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
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <ProfileForm />
    </div>
  );
}
