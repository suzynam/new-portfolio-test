'use client';

import { NotionRenderer } from 'react-notion-x';
import { ExtendedRecordMap } from 'notion-types';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Optional components for react-notion-x
const Code = dynamic(() =>
    import('react-notion-x/build/third-party/code').then((m) => m.Code)
);
const Collection = dynamic(() =>
    import('react-notion-x/build/third-party/collection').then(
        (m) => m.Collection
    )
);
const Equation = dynamic(() =>
    import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
);
const Pdf = dynamic(
    () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
    { ssr: false }
);
const Modal = dynamic(
    () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
    { ssr: false }
);

interface NotionPageProps {
    recordMap: ExtendedRecordMap;
}

export default function NotionPage({ recordMap }: NotionPageProps) {
    return (
        <div className="notion-container">
            <NotionRenderer
                recordMap={recordMap}
                fullPage={false}
                darkMode={true}
                components={{
                    nextLink: Link,
                    Code,
                    Collection,
                    Equation,
                    Pdf,
                    Modal,
                }}
            />
        </div>
    );
}
