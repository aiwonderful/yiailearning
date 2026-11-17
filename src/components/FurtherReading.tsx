import Link from 'next/link';

export type ReadingLink = {
  href: string;
  title: string;
  note: string;
};

export default function FurtherReading({ links }: { links: ReadingLink[] }) {
  return (
    <section className="mx-auto mt-14 max-w-5xl" aria-labelledby="further-reading">
      <h2 id="further-reading" className="font-serif text-2xl font-black text-[#20242A]">延伸阅读</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="block h-full rounded-2xl border border-[#DCE4DD] bg-[#F8F7F2] p-4 hover:border-[#9C563F]/40">
              <span className="font-semibold text-[#20242A]">{item.title}</span>
              <span className="mt-2 block text-sm leading-6 text-[#59616B]">{item.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
