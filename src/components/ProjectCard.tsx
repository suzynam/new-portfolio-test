import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    thumbnail?: string;
    tags?: string[];
    date?: string;
}

export default function ProjectCard({
    id,
    title,
    description,
    thumbnail,
    tags,
    date,
}: ProjectCardProps) {
    return (
        <Link href={`/projects/${id}`}>
            <div className="group space-y-6">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-zinc-100 transition-transform duration-700 ease-out group-hover:scale-[0.98]">
                    {thumbnail ? (
                        <Image
                            src={thumbnail}
                            alt={title}
                            fill
                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-zinc-50 text-zinc-300 uppercase font-black tracking-widest text-lg">
                            Preview
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute bottom-10 left-10 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="flex items-center space-x-3 text-white font-black uppercase text-sm tracking-widest">
                            <span>View Case Study</span>
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-black">→</span>
                        </div>
                    </div>
                </div>

                <div className="px-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                            {tags?.slice(0, 2).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[10px] uppercase font-black tracking-widest text-orange-500"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        {date && (
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                {date.split('-').join('.')}
                            </span>
                        )}
                    </div>

                    <h3 className="mb-3 text-3xl font-black tracking-tighter text-black sm:text-4xl leading-none">
                        {title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500 font-medium">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
