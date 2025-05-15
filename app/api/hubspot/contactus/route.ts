import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const {
    hutk,
    pageUri,
    pageName,
    first_name, 
    last_name, 
    email, 
    company, 
    message, 
    nextjs_how_did_you_find_out_about_us 
  } = await req.json();

  const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;
  const HUBSPOT_PORTAL_ID = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const HUBSPOT_FORM_ID = process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID;

  try {
    // Ensure nextjs_how_did_you_find_out_about_us is string by joining array values
    const formattedSources = Array.isArray(nextjs_how_did_you_find_out_about_us) ? nextjs_how_did_you_find_out_about_us.join(', ') : '';

    // 1. HubSpot FORM payload
    const formRes = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: [
          { name: 'firstname', value: first_name },
          { name: 'lastname', value: last_name },
          { name: 'email', value: email },
          { name: 'company', value: company },
          { name: 'message', value: message },
          { name: 'nextjs_how_did_you_find_out_about_us', value: formattedSources }  // Ensure sources is a semicolon-separated string
        ],
        context: {
          hutk,       // visitor tracking token
          pageUri,    // full URL
          pageName,   // page title
        }
      }),
    });

    if (!formRes.ok) {
      const errData = await formRes.json();
      throw new Error(`Form submission failed: ${JSON.stringify(errData)}`);
    }

    // 2. Retrieve newly created contact by email (for association)
    const contactSearch = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUBSPOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filterGroups: [{
          filters: [{ propertyName: 'email', operator: 'EQ', value: email }],
        }],
        properties: ['email'],
        limit: 1,
      }),
    });

    const contactData = await contactSearch.json();
    const contactId = contactData?.results?.[0]?.id;

    if (contactData.total > 0 && contactData.results.length > 0) {
      return NextResponse.json(
        { error: 'Contact with this email already exists.' },
        { status: 409 }
      );
    }

    // 3. If company name provided, check if company exists in CRM
    if (company?.trim()) {
      const searchCompany = await fetch('https://api.hubapi.com/crm/v3/objects/companies/search', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: 'name',
              operator: 'EQ',
              value: company,
            }],
          }],
          properties: ['name'],
          limit: 1,
        }),
      });

      const companyData = await searchCompany.json();
      const companyId = companyData?.results?.[0]?.id;

      if (companyId) {
        // 4. If company exists, associate contact with company
        await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}/associations/companies/${companyId}/contact_to_company`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${HUBSPOT_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
      }
    }

    return NextResponse.json(
      { message: 'Form submitted and contact processed.' },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      // If error is an instance of Error, we can access .message
      console.error('HubSpot error:', error.message);
    } else {
      // Handle cases where the error is not an instance of Error
      console.error('HubSpot error:', error);
    }
    return NextResponse.json(
      { error: 'HubSpot request failed' },
      { status: 500 }
    );
  }
}
