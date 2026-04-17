const formConfig = {
  seizo_download: {
    serviceSlug: 'seizo',
    formType: 'seizo_download',
    fromEmail: 'info@99advisory.jp',
    adminEmail: '99tsukumo.info@gmail.com',
    requiredFields: ['company', 'industry', 'revenue', 'email'],
    allowedFields: ['company', 'industry', 'revenue', 'email', 'serviceSlug', 'formType'],
    userTemplate: 'seizoDownloadReply',
    adminTemplate: 'defaultAdminNotice',
    successMessage: '送信が完了しました。メールをご確認ください。'
  },

  cashflow_download: {
    serviceSlug: 'cashflow',
    formType: 'cashflow_download',
    fromEmail: 'info@99advisory.jp',
    adminEmail: '99tsukumo.info@gmail.com',
    requiredFields: ['company', 'issue', 'email'],
    allowedFields: ['company', 'issue', 'email', 'serviceSlug', 'formType'],
    userTemplate: 'cashflowDownloadReply',
    adminTemplate: 'defaultAdminNotice',
    successMessage: '送信が完了しました。メールをご確認ください。'
  },

  bankplan_download: {
    serviceSlug: 'bank-plan',
    formType: 'bankplan_download',
    fromEmail: 'info@99advisory.jp',
    adminEmail: '99tsukumo.info@gmail.com',
    requiredFields: ['company', 'purpose', 'email'],
    allowedFields: ['company', 'purpose', 'email', 'serviceSlug', 'formType'],
    userTemplate: 'bankplanDownloadReply',
    adminTemplate: 'defaultAdminNotice',
    successMessage: '送信が完了しました。メールをご確認ください。'
  },

  contact_inquiry: {
    serviceSlug: 'contact',
    formType: 'contact_inquiry',
    fromEmail: 'info@99advisory.jp',
    adminEmail: '99tsukumo.info@gmail.com',
    requiredFields: ['name', 'email', 'message'],
    allowedFields: ['name', 'company', 'email', 'message', 'serviceSlug', 'formType'],
    userTemplate: 'contactInquiryReply',
    adminTemplate: 'contactInquiryAdmin',
    successMessage: '送信が完了しました。確認次第ご連絡いたします。'
  },

  general: {
    serviceSlug: 'contact',
    formType: 'general',
    fromEmail: 'info@99advisory.jp',
    adminEmail: '99tsukumo.info@gmail.com',
    requiredFields: ['company', 'name', 'email'],
    allowedFields: ['company', 'name', 'email', 'message', 'inquiryType', 'serviceSlug', 'formType'],
    userTemplate: 'generalReply',
    adminTemplate: 'generalAdminNotice',
    successMessage: '送信が完了しました。2営業日以内にご連絡いたします。',
    sheetTag: 'contact',
  },

  monthly_review_contact: {
    serviceSlug: 'monthly-review',
    formType: 'monthly_review_contact',
    fromEmail: 'info@99advisory.jp',
    adminEmail: '99tsukumo.info@gmail.com',
    requiredFields: ['company', 'name', 'email', 'industry', 'revenue'],
    allowedFields: ['company', 'name', 'email', 'industry', 'revenue', 'message', 'serviceSlug', 'formType'],
    userTemplate: 'monthlyReviewReply',
    adminTemplate: 'generalAdminNotice',
    successMessage: '送信が完了しました。2営業日以内にご連絡いたします。',
    sheetTag: 'monthly-review',
  },

  monthly_report_contact: {
    serviceSlug: 'monthly-report',
    formType: 'monthly_report_contact',
    fromEmail: 'info@99advisory.jp',
    adminEmail: '99tsukumo.info@gmail.com',
    requiredFields: ['company', 'name', 'email', 'industry', 'revenue'],
    allowedFields: ['company', 'name', 'email', 'industry', 'revenue', 'message', 'serviceSlug', 'formType'],
    userTemplate: 'generalReply',
    adminTemplate: 'generalAdminNotice',
    successMessage: '送信が完了しました。2営業日以内にご連絡いたします。',
    sheetTag: 'monthly-report',
  },

  yojitsu_contact: {
    serviceSlug: 'yojitsu',
    formType: 'yojitsu_contact',
    fromEmail: 'info@99advisory.jp',
    adminEmail: '99tsukumo.info@gmail.com',
    requiredFields: ['company', 'name', 'email', 'industry', 'revenue'],
    allowedFields: ['company', 'name', 'email', 'industry', 'revenue', 'message', 'serviceSlug', 'formType'],
    userTemplate: 'generalReply',
    adminTemplate: 'generalAdminNotice',
    successMessage: '送信が完了しました。2営業日以内にご連絡いたします。',
    sheetTag: 'yojitsu',
  },

  meeting_design_contact: {
    serviceSlug: 'meeting-design',
    formType: 'meeting_design_contact',
    fromEmail: 'info@99advisory.jp',
    adminEmail: '99tsukumo.info@gmail.com',
    requiredFields: ['company', 'name', 'email', 'industry', 'revenue'],
    allowedFields: ['company', 'name', 'email', 'industry', 'revenue', 'message', 'serviceSlug', 'formType'],
    userTemplate: 'generalReply',
    adminTemplate: 'generalAdminNotice',
    successMessage: '送信が完了しました。2営業日以内にご連絡いたします。',
    sheetTag: 'meeting-design',
  },
};

export default formConfig;
