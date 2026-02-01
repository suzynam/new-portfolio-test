const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

const careerItems = [
    {
        name: 'Senior Product Designer @ Frame.io',
        description: 'Led the vision for professional video review tools, focusing on seamless global collaboration pipelines.',
        date: '2022-06-01',
        tag: 'Career'
    },
    {
        name: 'Lead Product Designer @ Stripe',
        description: 'Developed the core merchant experience for financial transparency and automated reporting across 12 countries.',
        date: '2020-03-15',
        tag: 'Career'
    },
    {
        name: 'Masters in HCI @ Stanford University',
        description: 'Advanced research in human-centered AI and behavioral design patterns.',
        date: '2018-09-01',
        tag: 'Education'
    },
    {
        name: 'Product Designer @ Uber',
        description: 'Redesigned the driver onboarding flow across 50+ countries, significantly reducing friction and support tickets.',
        date: '2016-08-01',
        tag: 'Career'
    },
    {
        name: 'B.Des in Industrial Design @ Hongik University',
        description: 'Graduated with honors, focusing on the intersection of physical and digital products.',
        date: '2012-03-01',
        tag: 'Education'
    }
];

async function addCareerItems() {
    console.log('Adding career milestones to Notion...');
    if (!databaseId) {
        console.error('Error: NOTION_DATABASE_ID is missing');
        return;
    }

    for (const item of careerItems) {
        try {
            await notion.pages.create({
                parent: { database_id: databaseId },
                properties: {
                    'Name': {
                        title: [{ text: { content: item.name } }]
                    },
                    'Description': {
                        rich_text: [{ text: { content: item.description } }]
                    },
                    'Date': {
                        date: { start: item.date }
                    },
                    'Tag': {
                        select: { name: item.tag }
                    }
                }
            });
            console.log(`Added: ${item.name}`);
        } catch (error) {
            console.error(`Failed to add ${item.name}:`, error.message);
        }
    }
    console.log('Finished adding career milestones.');
}

addCareerItems();
