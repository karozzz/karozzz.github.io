import React from 'react';

interface IconProps {
  className?: string;
}

// Base wrapper component for all skill icons
export function SkillIcon({ 
  children, 
  className = ""
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-8 h-8 flex items-center justify-center mr-3 ${className}`}>
      {children}
    </div>
  );
}

export function ReactIcon({ className = "" }: IconProps) {
  return (
    <SkillIcon className={className}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <circle cx="12" cy="12" r="2" fill="currentColor" className="text-blue-400" />
        <g className="text-blue-500" stroke="currentColor" strokeWidth="1">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
        </g>
      </svg>
    </SkillIcon>
  );
}

export function TypeScriptIcon({ className = "" }: IconProps) {
  return (
    <SkillIcon className={className}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <rect x="2" y="2" width="20" height="20" rx="2" className="text-blue-600" fill="currentColor" />
        <path d="M14 11.5V9H7V11H10.5V18H14V11.5Z" className="text-white" fill="currentColor" />
        <path d="M18 14.5C18 13.8 17.8 13.3 17.3 12.9C16.9 12.5 16.2 12.2 15.3 11.9C14.8 11.8 14.4 11.7 14.2 11.5C14 11.4 13.9 11.2 13.9 11C13.9 10.8 14 10.6 14.2 10.5C14.4 10.3 14.7 10.3 15.1 10.3C15.5 10.3 15.8 10.4 16 10.6C16.2 10.8 16.4 11 16.5 11.4L18 11C17.8 10.4 17.5 9.9 17.1 9.6C16.6 9.2 15.9 9 15.1 9C14.2 9 13.5 9.2 13 9.6C12.5 10 12.3 10.5 12.3 11.2C12.3 11.9 12.5 12.4 13 12.8C13.5 13.2 14.2 13.5 15 13.7C15.5 13.8 15.9 14 16.1 14.1C16.3 14.3 16.4 14.5 16.4 14.7C16.4 15 16.3 15.2 16.1 15.3C15.9 15.5 15.5 15.6 15.1 15.6C14.6 15.6 14.2 15.5 13.9 15.2C13.6 14.9 13.4 14.6 13.3 14.2L11.8 14.5C11.9 15.2 12.3 15.7 12.8 16.1C13.4 16.5 14.2 16.7 15.1 16.7C16.1 16.7 16.8 16.5 17.4 16.1C17.9 15.7 18.2 15.2 18.2 14.4L18 14.5Z" className="text-white" fill="currentColor" />
      </svg>
    </SkillIcon>
  );
}

export function TailwindIcon({ className = "" }: IconProps) {
  return (
    <SkillIcon className={className}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 6.036C9.8 6.036 8.4 7.236 7.8 9.636C8.7 8.436 9.75 8.036 10.95 8.436C11.6329 8.6597 12.1187 9.1507 12.654 9.692C13.5243 10.5711 14.5212 11.586 16.2 11.586C18.4 11.586 19.8 10.386 20.4 7.986C19.5 9.186 18.45 9.586 17.25 9.186C16.5671 8.9623 16.0813 8.4713 15.546 7.93C14.6757 7.0509 13.6788 6.036 12 6.036ZM7.8 11.586C5.6 11.586 4.2 12.786 3.6 15.186C4.5 13.986 5.55 13.586 6.75 13.986C7.4329 14.2097 7.9187 14.7007 8.454 15.242C9.3243 16.1211 10.3212 17.136 12 17.136C14.2 17.136 15.6 15.936 16.2 13.536C15.3 14.736 14.25 15.136 13.05 14.736C12.3671 14.5123 11.8813 14.0213 11.346 13.5C10.4757 12.6209 9.4788 11.586 7.8 11.586Z" className="text-blue-400" fill="currentColor" />
      </svg>
    </SkillIcon>
  );
}

export function NodeJsIcon({ className = "" }: IconProps) {
  return (
    <SkillIcon className={className}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M12 21.5C11.7 21.5 11.4 21.4 11.2 21.3L8.8 19.9C8.5 19.7 8.6 19.7 8.7 19.7C9.1 19.5 9.1 19.5 9.5 19.7L11.5 20.8C11.6 20.9 11.8 20.9 11.9 20.8L19.9 16.2C20 16.1 20.1 16 20.1 15.8V6.6C20.1 6.4 20 6.3 19.9 6.2L11.9 1.6C11.8 1.5 11.6 1.5 11.5 1.6L3.5 6.2C3.4 6.3 3.3 6.4 3.3 6.6V15.8C3.3 16 3.4 16.1 3.5 16.2L5.5 17.4C6.5 17.9 7.1 17.4 7.1 16.9V7.1C7.1 7 7.2 6.9 7.3 6.9H8.3C8.4 6.9 8.5 7 8.5 7.1V16.9C8.5 18 7.9 18.7 6.9 18.7C6.5 18.7 6.2 18.7 5.3 18.2L3.4 17.1C3 16.9 2.8 16.5 2.8 16.1V6.3C2.8 5.9 3 5.5 3.4 5.3L11.4 0.7C11.8 0.5 12.3 0.5 12.7 0.7L20.7 5.3C21.1 5.5 21.3 5.9 21.3 6.3V16.1C21.3 16.5 21.1 16.9 20.7 17.1L12.7 21.7C12.5 21.4 12.3 21.5 12 21.5Z" className="text-green-600" fill="currentColor" />
        <path d="M14.4 15.5C11.4 15.5 10.7 14.3 10.7 13.3C10.7 13.2 10.8 13.1 10.9 13.1H11.9C12 13.1 12.1 13.2 12.1 13.3C12.3 14 12.7 14.4 14.4 14.4C15.8 14.4 16.4 14.1 16.4 13.3C16.4 12.9 16.2 12.5 13.9 12.3C11.9 12.1 10.7 11.6 10.7 10.2C10.7 8.9 11.7 8.1 14.1 8.1C16.8 8.1 17.7 9 17.8 10.5C17.8 10.6 17.7 10.7 17.6 10.7H16.6C16.5 10.7 16.4 10.6 16.4 10.5C16.2 9.6 15.6 9.2 14.1 9.2C12.4 9.2 12.2 9.7 12.2 10.1C12.2 10.6 12.5 10.7 14.6 11C16.7 11.2 17.9 11.7 17.9 13.1C17.9 14.5 16.8 15.5 14.4 15.5Z" className="text-green-600" fill="currentColor" />
      </svg>
    </SkillIcon>
  );
}

export function PythonIcon({ className = "" }: IconProps) {
  return (
    <SkillIcon className={className}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M11.8 2C9.78724 2 8.1 2.40446 8.1 3.42857V5.28571H12.1V6H6.4C5.05992 6 3.9 7.01143 3.9 8.71429L3.9 12.2857C3.9 14.0429 5.1466 15 6.4 15H7.8V13.1429C7.8 11.6 9.3 10.2857 11.4 10.2857H15.4C16.8834 10.2857 18 9.32571 18 7.85714V4.14286C18 2.67429 16.3657 2 14.9 2H11.8Z" className="text-blue-600" fill="currentColor" />
        <path d="M10.5 4.14286C11.0523 4.14286 11.5 3.69514 11.5 3.14286C11.5 2.59057 11.0523 2.14286 10.5 2.14286C9.94772 2.14286 9.5 2.59057 9.5 3.14286C9.5 3.69514 9.94772 4.14286 10.5 4.14286Z" className="text-white" fill="currentColor" />
        <path d="M12.6 22C14.6128 22 16.3 21.5955 16.3 20.5714V18.7143H12.3V18H18C19.3401 18 20.5 16.9886 20.5 15.2857L20.5 11.7143C20.5 9.95713 19.2534 9 18 9H16.6V10.8571C16.6 12.4 15.1 13.7143 13 13.7143H9C7.51656 13.7143 6.4 14.6743 6.4 16.1429V19.8571C6.4 21.3257 7.93427 22 9.5 22H12.6Z" className="text-yellow-500" fill="currentColor" />
        <path d="M13.5 19.8571C12.9477 19.8571 12.5 20.3049 12.5 20.8571C12.5 21.4094 12.9477 21.8571 13.5 21.8571C14.0523 21.8571 14.5 21.4094 14.5 20.8571C14.5 20.3049 14.0523 19.8571 13.5 19.8571Z" className="text-white" fill="currentColor" />
      </svg>
    </SkillIcon>
  );
}

export function DatabaseIcon({ className = "" }: IconProps) {
  return (
    <SkillIcon className={className}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M12 3C7.58 3 4 4.79 4 7V17C4 19.21 7.58 21 12 21C16.42 21 20 19.21 20 17V7C20 4.79 16.42 3 12 3Z" className="text-purple-500" fill="currentColor" opacity="0.2" />
        <path d="M12 5C16.42 5 18 6.79 18 8C18 9.21 16.42 11 12 11C7.58 11 6 9.21 6 8C6 6.79 7.58 5 12 5Z" className="text-purple-600" fill="currentColor" />
        <path d="M12 15C16.42 15 18 13.21 18 12V15C18 16.21 16.42 18 12 18C7.58 18 6 16.21 6 15V12C6 13.21 7.58 15 12 15Z" className="text-purple-600" fill="currentColor" />
        <path d="M12 9C16.42 9 18 7.21 18 6V9C18 10.21 16.42 12 12 12C7.58 12 6 10.21 6 9V6C6 7.21 7.58 9 12 9Z" className="text-purple-600" fill="currentColor" />
      </svg>
    </SkillIcon>
  );
}

export function UiUxIcon({ className = "" }: IconProps) {
  return (
    <SkillIcon className={className}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M17 3H7C5.9 3 5 3.9 5 5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V5C19 3.9 18.1 3 17 3ZM7 19V5H17V19H7Z" className="text-purple-500" fill="currentColor" />
        <path d="M12 7C10.9 7 10 7.9 10 9C10 10.1 10.9 11 12 11C13.1 11 14 10.1 14 9C14 7.9 13.1 7 12 7Z" className="text-pink-400" fill="currentColor" />
        <path d="M16 15H8V17H16V15Z" className="text-pink-400" fill="currentColor" />
        <path d="M16 12H8V14H16V12Z" className="text-pink-400" fill="currentColor" />
      </svg>
    </SkillIcon>
  );
}

export function DevOpsIcon({ className = "" }: IconProps) {
  return (
    <SkillIcon className={className}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M10.5 4.5C10.5 3.12 9.38 2 8 2C6.62 2 5.5 3.12 5.5 4.5C5.5 5.44 6.14 6.23 7 6.42V13.5C7 14.33 6.33 15 5.5 15C4.67 15 4 14.33 4 13.5V12.18C4.53 11.87 5 11.28 5 10.5C5 9.67 4.33 9 3.5 9C2.67 9 2 9.67 2 10.5C2 11.28 2.47 11.87 3 12.18V13.5C3 14.88 4.12 16 5.5 16C6.88 16 8 14.88 8 13.5V6.42C8.86 6.23 9.5 5.44 9.5 4.5Z" className="text-blue-600" fill="currentColor" />
        <path d="M21 10.5C21 9.67 20.33 9 19.5 9C18.67 9 18 9.67 18 10.5C18 11.28 18.47 11.87 19 12.18V13.5C19 14.33 18.33 15 17.5 15C16.67 15 16 14.33 16 13.5V6.42C16.86 6.23 17.5 5.44 17.5 4.5C17.5 3.12 16.38 2 15 2C13.62 2 12.5 3.12 12.5 4.5C12.5 5.44 13.14 6.23 14 6.42V13.5C14 14.88 15.12 16 16.5 16C17.88 16 19 14.88 19 13.5V12.18C19.53 11.87 20 11.28 20 10.5Z" className="text-blue-600" fill="currentColor" />
        <path d="M12 22C15.866 22 19 18.866 19 15C19 11.134 15.866 8 12 8C8.13401 8 5 11.134 5 15C5 18.866 8.13401 22 12 22Z" className="text-blue-300" fill="currentColor" opacity="0.4" />
        <path d="M16 15L12 11V14H8V16H12V19L16 15Z" className="text-blue-600" fill="currentColor" />
      </svg>
    </SkillIcon>
  );
}

export function ProjectManagementIcon({ className = "" }: IconProps) {
  return (
    <SkillIcon className={className}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" className="text-blue-600" fill="currentColor" opacity="0.2" />
        <path d="M7 12H9V18H7V12Z" className="text-green-600" fill="currentColor" />
        <path d="M11 8H13V18H11V8Z" className="text-yellow-500" fill="currentColor" />
        <path d="M15 4H17V18H15V4Z" className="text-red-500" fill="currentColor" />
        <path d="M3 20H21C21.6 20 22 19.6 22 19C22 18.4 21.6 18 21 18H3C2.4 18 2 18.4 2 19C2 19.6 2.4 20 3 20Z" className="text-blue-600" fill="currentColor" />
      </svg>
    </SkillIcon>
  );
}
