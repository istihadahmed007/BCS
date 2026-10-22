import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'BCS Crack — Online Exam Portal & Precision Preparation',
  description:
    'Online Exam Portal for Bangladesh Civil Service (BCS) 46th General BCS & 51st Special BCS Health. Active recall, 20,000 verified questions, mock tests, and syllabus tracking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
