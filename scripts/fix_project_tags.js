const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function fixProjectTags() {
    console.log('Fetching projects to fix tags...');
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            property: 'Name',
            rich_text: {
                contains: 'EcoTrack'
            }
        }
    });

    for (const page of response.results) {
        console.log(`Updating tag for: ${page.properties.Name.title[0]?.plain_text}`);
        await notion.pages.update({
            page_id: page.id,
            properties: {
                'Tag': {
                    select: { name: 'Product Design' }
                }
            }
        });
    }
    console.log('Finished updating tags.');
}

fixProjectTags();
