import { Metadata } from "next";
import Markdown from "react-markdown";

const cookiesPolicy = `
# Cookies Policy

## Introduction

NEAR Catalog uses cookies to improve your experience on our website. This policy explains how we use cookies and how you can manage them.

## What are cookies

Cookies are small text files that are stored on your device when you visit a website. They are used to store information about your preferences, such as your language preference or the pages you visit. Cookies can also be used to track your activity on the website and to serve targeted advertising.

## How we use cookies

NEAR Catalog uses cookies to:

- Provide you with a better browsing experience
- Improve the security and privacy of our website
- Provide you with targeted advertising based on your interests
- Deliver content that is relevant to your interests

## How to manage cookies

You can manage your cookies settings through your browser settings. Most browsers have a "Cookies" or "Privacy" settings option that allows you to control how cookies are stored and used on websites.

## Third-party cookies

NEAR Catalog may use third-party cookies to provide you with a better browsing experience. These third-party cookies may be used to track your activity on the website and to serve targeted advertising based on your interests.

## Changes to this policy

We may update this cookies policy from time to time. We encourage you to review this policy regularly for any changes. If we make any changes to this policy, we will notify you by email or by updating the "Last updated" date at the top of this page. You are advised to review the policy whenever you access or use our website or app.

## Contact us

If you have any questions about this cookies policy, please contact us at [hello@near.foundation](mailto:hello@near.foundation).
`;

export const metadata: Metadata = {
  title: "Cookies Policy",
  description:
    "NEAR Catalog uses cookies to improve your experience on our website. This policy explains how we use cookies and how you can manage them.",
};

export default function CookiesPage() {
  return <Markdown>{cookiesPolicy}</Markdown>;
}
