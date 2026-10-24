import { Suspense } from 'react';
import TestPlayerContent from '@/app/test/[sessionId]/player-content';
import { RefreshCw } from 'lucide-react';

export default function MockTestPlayerPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-3">
          <RefreshCw className="h-8 w-8 text-[#6538F5] animate-spin" />
          <p className="text-xs font-semibold text-slate-500 bangla-font">
            পরীক্ষার সেশন প্রস্তুত করা হচ্ছে...
          </p>
        </div>
      }
    >
      <TestPlayerContent params={params} />
    </Suspense>
  );
}
