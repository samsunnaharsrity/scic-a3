export default function CancellationPolicyPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-30">
      <h1 className="mb-8 text-4xl font-bold">
        Cancellation Policy
      </h1>

      <div className="space-y-6 leading-8 text-gray-700">
        <p>
          Cancellation policies may vary depending on the property.
        </p>

        <ul className="list-disc space-y-3 pl-6">
          <li>Free cancellation within 24 hours of booking.</li>
          <li>Partial refund before check-in (property dependent).</li>
          <li>No refund after the check-in date.</li>
          <li>Emergency cases are reviewed individually.</li>
        </ul>
      </div>
    </div>
  );
}