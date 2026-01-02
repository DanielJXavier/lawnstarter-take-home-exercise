import "@testing-library/jest-dom";

import React from "react";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock Next.js Link - render as actual anchor tag for testing
jest.mock("next/link", () => {
  return function Link({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return React.createElement("a", { href, ...props }, children);
  };
});

// Setup global fetch mock
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
