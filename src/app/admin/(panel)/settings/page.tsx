export const metadata = {
  title: "Settings · Admin Panel",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-deep">
          Site Settings<span className="text-primary">.</span>
        </h2>
        <p className="text-muted text-sm mt-1">
          Global site metadata, hero texts, stats, CV, and contact details.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-bold">
          ⚡
        </div>
        <h3 className="font-heading font-bold text-lg text-deep">
          Settings Manager Shell Ready
        </h3>
        <p className="text-muted text-sm max-w-md mx-auto">
          The settings single-form editor will be implemented in TASK-025.
        </p>
      </div>
    </div>
  );
}
