import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "../../new/profile-form";

export default function SettingsProfilePage() {
  return (
    <div>
      <div className="px-6 py-4">
        <h3 className="text-lg font-medium">Tasks</h3>
        <p className="text-sm text-muted-foreground">
          This where you will need to edit your task.
        </p>
      </div>
      <Separator />
      <div className="space-y-6 max-w-6xl mx-auto px-6 py-6">
        <ProfileForm />
      </div>
    </div>
  );
}
