"use client";

import { useMemo, useState } from "react";

type PaymentMethod = {
  id: string;
  brand: "visa" | "mastercard" | "amex" | "mada" | "unknown";
  last4: string;
  expMonth: number;
  expYear: number;
  holderName?: string;
  isDefault: boolean;
};

export default function PaymentMethodsClient({
  initialMethods,
}: {
  initialMethods: PaymentMethod[];
}) {
  const [methods, setMethods] = useState<PaymentMethod[]>(initialMethods);
  const [busyId, setBusyId] = useState<string | null>(null);

  const defaultMethod = useMemo(
    () => methods.find((m) => m.isDefault) ?? null,
    [methods]
  );

  const brandLabel = (b: PaymentMethod["brand"]) => {
    switch (b) {
      case "visa":
        return "Visa";
      case "mastercard":
        return "Mastercard";
      case "amex":
        return "American Express";
      case "mada":
        return "mada";
      default:
        return "Card";
    }
  };

  const brandPill = (b: PaymentMethod["brand"]) => {
    const base =
      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border";
    const map: Record<PaymentMethod["brand"], string> = {
      visa: "bg-blue-50 text-blue-700 border-blue-200",
      mastercard: "bg-orange-50 text-orange-700 border-orange-200",
      amex: "bg-sky-50 text-sky-700 border-sky-200",
      mada: "bg-emerald-50 text-emerald-700 border-emerald-200",
      unknown: "bg-neutral-50 text-neutral-700 border-neutral-200",
    };
    return <span className={`${base} ${map[b]}`}>{brandLabel(b)}</span>;
  };

  const handleSetDefault = async (id: string) => {
    setBusyId(id);
    try {
      // TODO: call API/server action to set default
      await new Promise((r) => setTimeout(r, 500));
      setMethods((prev) => prev.map((m) => ({ ...m, isDefault: m.id === id })));
    } finally {
      setBusyId(null);
    }
  };

  const handleRemove = async (id: string) => {
    setBusyId(id);
    try {
      // TODO: call API/server action to remove method
      await new Promise((r) => setTimeout(r, 500));

      setMethods((prev) => {
        const next = prev.filter((m) => m.id !== id);
        // لو شلت الديفولت، اختار أول واحد تلقائيًا كـ default (اختياري)
        if (next.length && !next.some((m) => m.isDefault)) {
          next[0] = { ...next[0], isDefault: true };
        }
        return next;
      });
    } finally {
      setBusyId(null);
    }
  };

  const handleAddMethod = async () => {
    // UI placeholder: في الحقيقة هنا هتفتح Stripe SetupIntent / payment element
    const fakeId = `pm_${Math.random().toString(16).slice(2)}`;
    const newMethod: PaymentMethod = {
      id: fakeId,
      brand: "visa",
      last4: String(Math.floor(1000 + Math.random() * 9000)),
      expMonth: 1 + Math.floor(Math.random() * 12),
      expYear: 2026 + Math.floor(Math.random() * 4),
      holderName: "Omar",
      isDefault: methods.length === 0,
    };
    setMethods((prev) => [newMethod, ...prev]);
  };

  if (!methods.length) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-6 text-center">
        <h3 className="text-base font-semibold text-neutral-900">
          No saved payment methods
        </h3>
        <p className="mt-2 text-sm text-neutral-600">
          Add a card to pay faster at checkout.
        </p>
        <button
          type="button"
          onClick={handleAddMethod}
          className="inline-flex mt-4 items-center justify-center rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Add payment method
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {defaultMethod ? (
            <p className="text-sm text-neutral-600">
              Default:{" "}
              <span className="font-medium text-neutral-900">
                {brandLabel(defaultMethod.brand)} •••• {defaultMethod.last4}
              </span>
            </p>
          ) : (
            <p className="text-sm text-neutral-600">No default method set.</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddMethod}
          className="shrink-0 inline-flex items-center justify-center rounded-xl  px-4 py-2 text-sm font-medium text-white  main-background"
        >
          Add method
        </button>
      </div>

      <ul className="grid gap-3 md:grid-cols-2">
        {methods.map((m) => (
          <li
            key={m.id}
            className="rounded-2xl border border-neutral-200 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {brandPill(m.brand)}
                  {m.isDefault && (
                    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border bg-neutral-900 text-white border-neutral-900">
                      Default
                    </span>
                  )}
                </div>

                <p className="mt-2 font-semibold text-neutral-900">
                  •••• {m.last4}
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  Expires {String(m.expMonth).padStart(2, "0")}/{m.expYear}
                </p>
                {m.holderName ? (
                  <p className="mt-1 text-xs text-neutral-500">
                    {m.holderName}
                  </p>
                ) : null}
              </div>

              <div className="shrink-0 flex flex-col items-end gap-2">
                {!m.isDefault ? (
                  <button
                    type="button"
                    disabled={busyId === m.id}
                    onClick={() => handleSetDefault(m.id)}
                    className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 disabled:opacity-60"
                  >
                    {busyId === m.id ? "Setting..." : "Set default"}
                  </button>
                ) : (
                  <span className="text-xs text-neutral-500">
                    Default method
                  </span>
                )}

                <button
                  type="button"
                  disabled={busyId === m.id}
                  onClick={() => handleRemove(m.id)}
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-60"
                >
                  {busyId === m.id ? "Removing..." : "Remove"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
