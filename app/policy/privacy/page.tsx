import { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const privacyPolicy = `
# Privacy Policy

## Introduction

NEAR Catalog is a platform that provides a directory of NEAR projects. This privacy policy outlines the types of information that NEAR Catalog collects, how it uses it, and how you can access and control it.

## Information collected

NEAR Catalog collects the following types of information:

- Personal information, such as name, email address, and phone number
- Usage information, such as the pages you visit and the time you spend on each page
- Technical information, such as the IP address and browser type you use

## Use of information

NEAR Catalog uses the collected information for the following purposes:

- To provide you with the requested service
- To improve the quality of the service
- To protect your rights and property
- To comply with legal requirements
- To enforce our terms and policies

## Access and control of information

You can access and control your information by logging into your account and updating your profile. You can also request to see or delete your information by contacting us at [hello@near.foundation](mailto:hello@near.foundation).

## Security

We take the security of your information seriously. We use industry-standard security measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet, or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.

## Changes to this policy

We may update this privacy policy from time to time. We encourage you to review this policy regularly for any changes. If we make any changes to this policy, we will notify you by email or by updating the "Last updated" date at the top of this page. You are advised to review the policy whenever you access or use our website or app.

## Contact us

If you have any questions about this privacy policy, please contact us at [hello@near.foundation](mailto:hello@near.foundation).
`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "NEAR Catalog is a platform that provides a directory of NEAR projects. This privacy policy outlines the types of information that NEAR Catalog collects, how it uses it, and how you can access and control it.",
};

export default function PrivacyPage() {
  return <Markdown remarkPlugins={[remarkGfm]}>{privacyPolicy}</Markdown>;
}
