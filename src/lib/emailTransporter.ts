import { env } from "@/env";
import { google } from "googleapis";
import nodemailer from "nodemailer";

const oauth2Client = new google.auth.OAuth2({
  clientId: env.authGoogleId,
  clientSecret: env.authGoogleSecret,
  redirectUri: "https://developers.google.com/oauthplayground",
});

oauth2Client.setCredentials({
  refresh_token: env.googleRefreshToken,
});

const token = await oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
  // @ts-expect-error: it's ok
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: env.googleUser,
    clientId: env.authGoogleId,
    clientSecret: env.authGoogleSecret,
    refreshToken: env.googleRefreshToken,
    accessToken: token.token,
  },
});

type Args = {
  to: string;
  subject: string;
  html: string;
};

class EmailService {
  static async sendEmail(args: Args) {
    const { html, subject, to } = args;
    await transporter.sendMail({
      to,
      subject,
      html,
    });
  }
}

export default EmailService;
