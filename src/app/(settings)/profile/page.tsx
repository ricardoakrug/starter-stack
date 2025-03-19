import { auth } from "@/lib/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { User } from "@/lib/types/auth";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user as User | undefined;

  if (!user) {
    return (
      <div className="flex min-h-[90vh] flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Please log in to view your profile
          </h1>
          <p className="mt-2 text-muted-foreground">
            You need to be authenticated to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user.image || undefined}
                  alt={user.name || ""}
                />
                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">
                  {user.name || "No name set"}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Name</Label>
                <p className="text-sm">{user.name || "Not set"}</p>
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <p className="text-sm">{user.email}</p>
              </div>
              <div className="grid gap-2">
                <Label>Email Verified</Label>
                <p className="text-sm">{user.emailVerified ? "Yes" : "No"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
