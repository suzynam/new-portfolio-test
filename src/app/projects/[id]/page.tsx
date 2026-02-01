import { getPageContent } from '@/lib/notion';
import NotionPage from '@/components/NotionPage';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProjectPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params;

    try {
        const recordMap = await getPageContent(id);

        if (!recordMap) {
            console.error(`RecordMap not found for page ID: ${id}`);
            return notFound();
        }

        // Extract cover image from recordMap
        const pageId = Object.keys(recordMap.block)[0];
        const pageBlock = recordMap.block[pageId]?.value;
        const coverUrl = pageBlock?.format?.page_cover;
        const title = pageBlock?.properties?.title?.[0]?.[0] || 'Project Details';

        let resolvedCoverUrl = coverUrl;
        if (coverUrl && coverUrl.startsWith('/')) {
            resolvedCoverUrl = `https://www.notion.so${coverUrl}`;
        } else if (coverUrl && coverUrl.includes('prod-files-secure')) {
            // Handle secure S3 URLs if needed, but react-notion-x usually handles this.
            // For a simple img tag, we might need a proxy or signed URL, 
            // but let's try direct first or use a fallback.
        }

        return (
            <main className="min-h-screen bg-black text-white selection:bg-orange-500/30">
                {/* Navigation / Header */}
                <nav className="fixed top-0 z-50 w-full px-6 py-8 sm:px-12 bg-black/20 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
                    <div className="mx-auto flex max-w-7xl items-center justify-between">
                        <Link href="/" className="group flex items-center space-x-3 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 group-hover:bg-orange-500 group-hover:text-black transition-all">←</span>
                            <span>Back to Works</span>
                        </Link>
                        <Link href="/" className="text-xl font-black tracking-tighter">NAM SUJI</Link>
                    </div>
                </nav>

                {/* Cinematic Hero / Cover */}
                <div className="relative h-[60vh] w-full overflow-hidden">
                    {resolvedCoverUrl ? (
                        <img
                            src={resolvedCoverUrl}
                            alt={title}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="h-full w-full bg-gradient-to-b from-zinc-900 to-black" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 pb-20">
                        <div className="mx-auto max-w-5xl">
                            <h1 className="text-5xl font-black tracking-tighter sm:text-7xl lg:text-8xl leading-none">
                                {title}
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="pb-32">
                    <div className="mx-auto max-w-5xl px-6">
                        <article className="premium-notion-container">
                            <NotionPage recordMap={recordMap} />
                        </article>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t border-white/5 bg-black px-6 py-12 text-center text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                    <p>&copy; {new Date().getFullYear()} Nam Suji. All rights reserved.</p>
                </footer>
            </main>
        );
    } catch (error) {
        console.error('Error fetching project content:', error);
        return notFound();
    }
}
