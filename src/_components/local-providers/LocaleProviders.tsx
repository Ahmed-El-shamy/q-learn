"use client";
import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";
import queryClient from "@/_lib/react-qyery";
import { CartProvider } from "@/store/CartProvider";
type Props = {
  children: ReactNode;
  locale: string;
  messages: Record<string, string>;
};

export default function LocaleProviders({ children, locale, messages }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider locale={locale} timeZone="UTC" messages={messages}>
        <CartProvider>{children}</CartProvider>
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
}
