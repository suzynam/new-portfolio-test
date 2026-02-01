import { getDatabase } from './src/lib/notion.ts';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function check() {
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!databaseId) {
        console.error('No database ID');
        return;
    }
    const projects = await getDatabase(databaseId);
    console.log(JSON.stringify(projects.map(p => ({
        name: p.properties.Name.title[0]?.plain_text,
        tag: p.properties.Tag?.select?.name || p.properties.Tag?.multi_select?.map(t => t.name),
        date: p.properties.Date?.date?.start
    })), null, 2));
}

check();
