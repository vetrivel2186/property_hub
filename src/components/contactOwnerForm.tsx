"use client";

export default function ContactOwnerForm() {
  return (
    <div className="bg-white shadow rounded-xl p-6">

      <h2 className="font-bold text-2xl mb-5">
        Contact Owner
      </h2>

      <form className="space-y-4">

        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
        />

        <textarea
          rows={5}
          placeholder="Message"
          className="w-full border p-3 rounded"
        />

        <button
          className="bg-blue-600 text-white p-3 rounded w-full"
        >
          Send Inquiry
        </button>

      </form>

    </div>
  );
}