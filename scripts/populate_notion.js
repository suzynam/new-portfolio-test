const apiKey = process.env.NOTION_API_KEY;

const projects = [
    {
        id: '2fa2caa6-88a7-8050-8d1d-cc58996e78df',
        name: 'NexaFinance: AI Personal Finance Copilot',
        tag: 'Product Design',
        date: '2024-01-15',
        description: 'Redefining financial management for Gen Z through an AI-first mobile experience that turns complex spending data into actionable saving strategies.',
        blocks: [
            { object: 'block', type: 'heading_1', heading_1: { rich_text: [{ text: { content: 'NexaFinance: AI-First Wealth Management' } }] } },
            { object: 'block', type: 'quote', quote: { rich_text: [{ text: { content: 'How can we make banking feel less like a chore and more like a conversation?' } }] } },
            { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: 'The Challenge' } }] } },
            { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ text: { content: 'Modern banking apps are often static and overwhelming. User research showed that 70% of Gen Z users feel financial anxiety when looking at their transaction history.' } }] } },
            { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: 'The Solution: A Conversational Copilot' } }] } },
            { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: 'Natural Language Query: Users can ask, "Can I afford dinner at a sushi place tonight?"' } }] } },
            { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: 'Contextual Categorization: Automatically detects recurring subscriptions and suggests "Cancel" actions for unused ones.' } }] } },
            { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: 'Impact' } }] } },
            { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: '40% increase in Monthly Active Users (MAU).' } }] } },
            { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: '$2.5M+ total savings generated for users in 6 months.' } }] } }
        ]
    },
    {
        id: '2fa2caa6-88a7-809d-92ee-fdc4fd7ae7a9',
        name: 'EcoTrack: Marketplace for Circular Economy',
        tag: 'Career',
        date: '2023-11-20',
        description: 'Led the design of a peer-to-peer marketplace that facilitating the renting and resale of professional equipment, reducing electronic waste.',
        blocks: [
            { object: 'block', type: 'heading_1', heading_1: { rich_text: [{ text: { content: 'EcoTrack: Scaling Sustainability' } }] } },
            { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ text: { content: 'As a Staff Product Designer, I was tasked with scaling the EcoTrack marketplace to handle over 1M monthly transactions while maintaining trust.' } }] } },
            { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: 'Core Strategy: The Trust Architecture' } }] } },
            { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: 'Verified Gear History: Blockchain-backed logs of equipment maintenance.' } }] } },
            { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: 'Peer Endorsements: A dynamic rating system that prioritizes long-term reliability.' } }] } },
            { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: 'Operational Excellence' } }] } },
            { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ text: { content: 'Fraud Reduction: -80% | Dev Velocity: +30% | Conversion Rate: +15%' } }] } },
            { object: 'block', type: 'quote', quote: { rich_text: [{ text: { content: 'Nams leadership in the design system was the single biggest factor in our successful Series B launch. — CTO of EcoTrack' } }] } }
        ]
    },
    {
        id: '2fa2caa6-88a7-80cf-939f-c9a7a5d9a245',
        name: 'FlowState: Spatial Collaboration OS',
        tag: 'Product Design',
        date: '2024-02-05',
        description: 'A spatial collaboration platform that bridges the gap between physical presence and digital productivity for distributed global teams.',
        blocks: [
            { object: 'block', type: 'heading_1', heading_1: { rich_text: [{ text: { content: 'FlowState: The Future of Remote Work' } }] } },
            { object: 'block', type: 'paragraph', paragraph: { rich_text: [{ text: { content: 'FlowState is a Virtual Office Environment designed to solve the loneliness of remote work. This project explored AR/VR and productivity.' } }] } },
            { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: 'Rethinking Digital Presence' } }] } },
            { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: 'Spatial Audio: Teammates voices get louder as you walk toward their avatar.' } }] } },
            { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: 'Spontaneous Collision Zones: Virtual areas where mic/cam turn on automatically.' } }] } },
            { object: 'block', type: 'heading_2', heading_2: { rich_text: [{ text: { content: 'Design Principles' } }] } },
            { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: 'Minimalist UI: Reducing cognitive load through voice-first interactions.' } }] } },
            { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: [{ text: { content: 'Ergonomic Layouts: Placing high-frequency tools in the optimal gaze zone.' } }] } }
        ]
    }
];

async function updateNotion() {
    for (const project of projects) {
        console.log(`Updating project: ${project.name}...`);

        // 1. Update properties (Removed Status)
        const propResponse = await fetch(`https://api.notion.com/v1/pages/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                properties: {
                    Name: { title: [{ text: { content: project.name } }] },
                    Tag: { select: { name: project.tag } },
                    Date: { date: { start: project.date } },
                    Description: { rich_text: [{ text: { content: project.description } }] }
                }
            })
        });

        if (!propResponse.ok) {
            console.error(`Failed to update properties for ${project.name}:`, await propResponse.json());
            continue;
        }

        // 2. Append content blocks
        const contentResponse = await fetch(`https://api.notion.com/v1/blocks/${project.id}/children`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                children: project.blocks
            })
        });

        if (!contentResponse.ok) {
            console.error(`Failed to append content for ${project.name}:`, await contentResponse.json());
        } else {
            console.log(`Successfully updated ${project.name}`);
        }
    }
}

updateNotion();
