import SectionHeader from "../_components/SectionHeader";
import Card from "../_components/Card";
import PaymentMethodsClient from "./PaymentMethodsClient";

type PaymentMethod = {
  id: string;
  brand: "visa" | "mastercard" | "amex" | "mada" | "unknown";
  last4: string;
  expMonth: number;
  expYear: number;
  holderName?: string;
  isDefault: boolean;
};

async function getPaymentMethods(): Promise<PaymentMethod[]> {
  // TODO: replace with real fetch (DB / Stripe customer payment methods)
  return [
    {
      id: "pm_1",
      brand: "visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2027,
      holderName: "Omar",
      isDefault: true,
    },
    {
      id: "pm_2",
      brand: "mastercard",
      last4: "5100",
      expMonth: 8,
      expYear: 2026,
      holderName: "Omar",
      isDefault: false,
    },
  ];
}

export default async function PaymentMethodsPage() {
  const methods = await getPaymentMethods();

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Payment methods"
        subtitle="Manage your saved cards and default payment method."
      />

      <Card
        title="Saved methods"
        description="Add, remove, or set a default payment method."
      >
        <PaymentMethodsClient initialMethods={methods} />
      </Card>

      <Card title="Security note" description="How we handle payments">
        <ul className="list-disc pl-5 space-y-2 text-sm text-neutral-700">
          <li>We don’t store your full card number on our servers.</li>
          <li>
            Payment details are handled by a secure payment provider (e.g.,
            Stripe).
          </li>
          <li>You can remove a payment method anytime.</li>
        </ul>
      </Card>
    </div>
  );
}
