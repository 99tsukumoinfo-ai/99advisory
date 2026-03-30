import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import formConfig from '../../../lib/form-config';
import {
  defaultAdminNotice,
  seizoDownloadReply,
  cashflowDownloadReply,
  bankplanDownloadReply,
  contactInquiryAdmin,
  contactInquiryReply,
  generalReply,
  generalAdminNotice,
  monthlyReviewReply,
} from '../../../lib/mail-templates';
import { appendLeadRow } from '../../../lib/sheets';

const resend = new Resend(process.env.RESEND_API_KEY);

const templateMap = {
  defaultAdminNotice,
  seizoDownloadReply,
  cashflowDownloadReply,
  bankplanDownloadReply,
  contactInquiryAdmin,
  contactInquiryReply,
  generalReply,
  generalAdminNotice,
  monthlyReviewReply,
};

function pickAllowedFields(body, allowedFields) {
  const result = {};
  for (const key of allowedFields) {
    result[key] = body[key] ?? '';
  }
  return result;
}

function validateRequiredFields(data, requiredFields) {
  return requiredFields.filter((field) => !data[field]);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const formType = body.formType;

    if (!formType) {
      return NextResponse.json(
        { ok: false, error: 'formType is required' },
        { status: 400 }
      );
    }

    const config = formConfig[formType];

    if (!config) {
      return NextResponse.json(
        { ok: false, error: 'Unknown formType' },
        { status: 400 }
      );
    }

    const filteredData = pickAllowedFields(body, config.allowedFields);
    const missingFields = validateRequiredFields(filteredData, config.requiredFields);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { ok: false, error: 'Missing required fields', missingFields },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: 'RESEND_API_KEY is missing' },
        { status: 500 }
      );
    }

    const adminTemplateFn = templateMap[config.adminTemplate];
    const userTemplateFn = templateMap[config.userTemplate];

    if (typeof adminTemplateFn !== 'function') {
      return NextResponse.json(
        { ok: false, error: `Unknown admin template: ${config.adminTemplate}` },
        { status: 500 }
      );
    }

    if (typeof userTemplateFn !== 'function') {
      return NextResponse.json(
        { ok: false, error: `Unknown user template: ${config.userTemplate}` },
        { status: 500 }
      );
    }

    const sourcePath = body.sourcePath || '';
    const adminTemplateData = { ...filteredData, sourcePath };
    const adminTemplate = adminTemplateFn(adminTemplateData);
    const userTemplate = userTemplateFn(filteredData);

    const adminResult = await resend.emails.send({
      from: `九十九アドバイザリー <${config.fromEmail}>`,
      to: config.adminEmail,
      replyTo: filteredData.email,
      subject: adminTemplate.subject,
      ...(adminTemplate.text ? { text: adminTemplate.text } : {}),
      ...(adminTemplate.html ? { html: adminTemplate.html } : {}),
    });

    const userResult = await resend.emails.send({
      from: `九十九アドバイザリー <${config.fromEmail}>`,
      to: filteredData.email,
      subject: userTemplate.subject,
      ...(userTemplate.text ? { text: userTemplate.text } : {}),
      ...(userTemplate.html ? { html: userTemplate.html } : {}),
    });

    try { await appendLeadRow([
      new Date().toISOString(),                                                      // 1. received_at
      config.serviceSlug,                                                            // 2. service_slug
      config.formType,                                                               // 3. form_type
      filteredData.company || '',                                                    // 4. company
      filteredData.name || '',                                                       // 5. name
      filteredData.email || '',                                                      // 6. email
      filteredData.industry || '',                                                   // 7. industry
      filteredData.revenue || '',                                                    // 8. revenue
      filteredData.message || filteredData.issue || filteredData.purpose || '',     // 9. message
      adminResult?.data?.id ?? '',                                                   // 10. admin_email_id
      userResult?.data?.id ?? '',                                                    // 11. user_email_id
      sourcePath,                                                                    // 12. source_path
      JSON.stringify(filteredData),                                                  // 13. raw_json
    ]); } catch (sheetsErr) { console.error('Sheets append failed:', sheetsErr.message); }

    return NextResponse.json({
      ok: true,
      message: config.successMessage,
      adminEmailId: adminResult?.data?.id ?? null,
      userEmailId: userResult?.data?.id ?? null
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Failed to process form submission',
        detail: error.message
      },
      { status: 500 }
    );
  }
}
