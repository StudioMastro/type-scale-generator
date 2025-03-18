import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200">
      <div className="h-full flex items-center justify-between px-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Type Scale Generator
        </h1>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/StudioMastro/TypographicScaleGenerator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Github className="h-5 w-5" />
            <span className="text-sm">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
