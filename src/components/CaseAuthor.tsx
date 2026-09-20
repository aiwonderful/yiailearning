'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function CaseAuthor({ name, avatar }: { name: string; avatar?: string }) {
  const [failed, setFailed] = useState(false);
  const allowed = avatar?.startsWith('https://search01.shengcaiyoushu.com/upload/avatar/');
  return (
    <span className="inline-flex min-w-0 items-center gap-2 font-semibold">
      <span className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#DDEDE6] text-xs text-[#356158]" aria-hidden="true">
        {allowed && !failed ? <Image src={avatar!} alt="" width={28} height={28} unoptimized referrerPolicy="no-referrer" className="h-full w-full object-cover" onError={() => setFailed(true)} /> : Array.from(name)[0]}
      </span>
      <span>{name}</span>
    </span>
  );
}
