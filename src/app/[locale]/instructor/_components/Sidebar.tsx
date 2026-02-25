import { Link } from "@/i18n/navigation";

const links = [
  { href: "/instructor/dashboard", label: "Overview" },
  { href: "/instructor/dashboard/courses", label: "Courses" },
  { href: "/instructor/dashboard/quizzes", label: "Quizzes" },
  { href: "/instructor/dashboard/students", label: "Students" },
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r min-h-screen p-4 space-y-2">
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="block px-3 py-2 rounded hover:bg-gray-100"
        >
          {l.label}
        </Link>
      ))}
    </aside>
  );
}
