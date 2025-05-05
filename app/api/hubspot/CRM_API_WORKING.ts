// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   const { first_name, last_name, email, company, message } = await req.json();
//   const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;

//   try {
//     // 0. Search for existing contact by email
//     const searchContact = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${HUBSPOT_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         filterGroups: [
//           {
//             filters: [
//               {
//                 propertyName: 'email',
//                 operator: 'EQ',
//                 value: email,
//               },
//             ],
//           },
//         ],
//         properties: ['email'],
//         limit: 1,
//       }),
//     });

//     const contactSearchData = await searchContact.json();

//     if (contactSearchData.total > 0 && contactSearchData.results.length > 0) {
//       return NextResponse.json(
//         { error: 'Contact with this email already exists.' },
//         { status: 409 }
//       );
//     }

//     // 1. Create Contact
//     const contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${HUBSPOT_TOKEN}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         properties: {
//           firstname: first_name,
//           lastname: last_name,
//           email,
//           message, // Requires custom property in HubSpot
//         },
//       }),
//     });

//     const contactData = await contactRes.json();
//     const contactId = contactData.id;

//     if (!contactId) throw new Error('Failed to create contact');

//     // 2. Search for existing company only if company was provided
//     if (company?.trim()) {
//       const searchCompany = await fetch('https://api.hubapi.com/crm/v3/objects/companies/search', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${HUBSPOT_TOKEN}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           filterGroups: [
//             {
//               filters: [
//                 {
//                   propertyName: 'name',
//                   operator: 'EQ',
//                   value: company,
//                 },
//               ],
//             },
//           ],
//           properties: ['name'],
//           limit: 1,
//         }),
//       });

//       const searchData = await searchCompany.json();
//       const companyId = searchData?.results?.[0]?.id;

//       // 3. Associate only if company exists
//       if (companyId) {
//         await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}/associations/companies/${companyId}/contact_to_company`, {
//           method: 'PUT',
//           headers: {
//             Authorization: `Bearer ${HUBSPOT_TOKEN}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({}),
//         });
//       }
//     }

//     return NextResponse.json(
//       { message: 'Contact created. Associated with company if it exists.' },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error('HubSpot error:', error.message || error);
//     return NextResponse.json(
//       { error: 'HubSpot request failed' },
//       { status: 500 }
//     );
//   }
// }
