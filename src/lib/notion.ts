import { NotionAPI } from 'notion-client';

const apiKey = process.env.NOTION_API_KEY;
const NOTION_VERSION = '2022-06-28';

// Official client is kept for other potential uses, but we'll use fetch for reliability
import { Client } from '@notionhq/client';
export const notion = apiKey ? new Client({ auth: apiKey }) : null;

// react-notion-x API client for fetching recordMap
export const notionX = new NotionAPI();

export async function getDatabase(databaseId: string) {
  if (!apiKey || !databaseId) {
    console.error('Notion configuration missing');
    return [];
  }

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sorts: [
          {
            property: 'Date',
            direction: 'descending',
          },
        ],
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Notion API error (Database):', {
        status: response.status,
        databaseId: databaseId,
        error: errorData
      });
      return [];
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.results?.length || 0} items from Notion.`);
    return data.results || [];
  } catch (error) {
    console.error('Fetch to Notion failed:', error);
    return [];
  }
}

export async function getPage(pageId: string) {
  if (!apiKey || !pageId) return null;

  try {
    const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Notion API error (Page):', errorData);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch to Notion (Page) failed:', error);
    return null;
  }
}

export async function getPageContent(pageId: string) {
  if (!pageId) return null;
  try {
    return await notionX.getPage(pageId);
  } catch (error) {
    console.error('Notion page content fetch failed:', error);
    return null;
  }
}
