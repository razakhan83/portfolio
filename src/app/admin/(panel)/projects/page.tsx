export const metadata = {
  title: "Projects · Admin Panel",
};

export default function AdminProjectsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-deep">
          Projects<span className="text-primary">.</span>
        </h2>
        <p className="text-muted text-sm mt-1">
          Projects table, CRUD actions, and image upload manager.
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-bold">
          ⚡
        </div>
        <h3 className="font-heading font-bold text-lg text-deep">
          Projects Manager Shell Ready
        </h3>
        <p className="text-muted text-sm max-w-md mx-auto">
          The projects CRUD manager and Cloudinary upload will be wired in TASK-021/TASK-022.
        </p>
      </div>
    </div>
  );
}
