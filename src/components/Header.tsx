import React from 'react';
import { Github } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200">
      <div className="h-full flex items-center justify-between px-6">
        <h1 className="text-xl font-semibold text-gray-900">Type Scale Generator</h1>
        <a
          href="https://github.com/alemastro97/Type-Scale-Generator"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Github className="h-5 w-5" />
          <span className="text-sm">View on GitHub</span>
        </a>
      </div>
    </header>
  );
}