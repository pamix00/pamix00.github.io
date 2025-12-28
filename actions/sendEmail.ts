"use server";
import { Resend } from "resend";
import sanitizeHtml from "sanitize-html";

const resend = new Resend(process.env.RESEND_API_KEY);

const clean = (text: string) => {
  return sanitizeHtml(text || "", {
    allowedTags: [],
    allowedAttributes: {},
  });
};

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail")?.toString().trim() || "";
  const message = formData.get("message")?.toString().trim() || "";
  const name = formData.get("name")?.toString().trim() || "";
  const subject = formData.get("subject")?.toString().trim() || "";

  if (!senderEmail || !message) {
    return { error: "Missing required fields" };
  }

  const cleanSenderEmail = clean(senderEmail);
  const cleanMessage = clean(message);
  const cleanName =  clean(name);
  const cleanSubject = clean(subject);

  const logoURL = `${process.env.FRONTEND_URL}/logo_black.png`;

  try {
    await resend.emails.send({
      from: "Contact - Patryk Czech <noreply@patrykczech.me>",
      to: "patrykczech00@gmail.com",
      replyTo: cleanSenderEmail,
      subject: `${cleanSubject} - Patryk Czech`,
      html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>New message</title>
          <style type="text/css">
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
            table { border-collapse: collapse !important; }
            body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: 'Courier New', Courier, monospace;">
          
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f5;">
            <tr>
              <td align="center" style="padding: 40px 10px;">
                
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <tr>
                    <td style="padding: 40px;">
                      
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" style="padding-bottom: 30px; border-bottom: 1px solid #e4e4e7;">
                            
                            <img src="${logoURL}" alt="Logo" width="150" height="60" 
                            style="display: block; border: 0; outline: none; text-decoration: none;"
                            />
                            <h1 style="margin: 20px 0 0 0; font-family: 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 24px; color: #18181b; font-weight: 700;">New message</h1>
                          </td>
                        </tr>
                      </table>

                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">
                        
                        <tr>
                          <td style="padding-bottom: 5px; color: #71717a; font-size: 12px; text-transform: uppercase; font-weight: 600;">From</td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 20px; color: #18181b; font-size: 16px; font-weight: 500;">${cleanName}</td>
                        </tr>

                        <tr>
                          <td style="padding-bottom: 5px; color: #71717a; font-size: 12px; text-transform: uppercase; font-weight: 600;">Email</td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 20px;">
                            <a href="mailto:${cleanSenderEmail}" style="color: #2563eb; text-decoration: none; font-size: 16px; font-weight: 500;">${cleanSenderEmail}</a>
                          </td>
                        </tr>

                        <tr>
                          <td style="padding-bottom: 5px; color: #71717a; font-size: 12px; text-transform: uppercase; font-weight: 600;">Subject</td>
                        </tr>
                        <tr>
                          <td style="padding-bottom: 20px; color: #18181b; font-size: 16px; font-weight: 500;">${cleanSubject || "No subject"}</td>
                        </tr>

                        <tr>
                          <td style="padding-bottom: 5px; color: #71717a; font-size: 12px; text-transform: uppercase; font-weight: 600;">Message</td>
                        </tr>
                        <tr>
                          <td>
                            <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 8px; padding: 20px; color: #3f3f46; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${cleanMessage}</div>
                          </td>
                        </tr>
                        
                      </table>

                    </td>
                  </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">
                  <tr>
                    <td align="center" style="padding-top: 30px; color: #a1a1aa; font-size: 12px; line-height: 1.5;">
                      <p style="margin: 0;">Sent via contact form at <strong>patrykczech.me</strong></p>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};