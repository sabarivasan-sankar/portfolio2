import { ROLES, type Role } from "../lib/access";

type Props = {
  role: Role;
  onChange: (role: Role) => void;
};

export function RoleSwitcher({ role, onChange }: Props) {
  return (
    <div role="radiogroup" aria-label="Viewer role" className="flex flex-wrap items-center gap-x-8 gap-y-3">
      {ROLES.map((r) => (
        <button
          key={r.id}
          type="button"
          role="radio"
          aria-checked={r.id === role}
          onClick={() => onChange(r.id)}
          className="role-tab font-mono text-sm md:text-base"
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
