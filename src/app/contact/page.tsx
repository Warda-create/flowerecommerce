import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import MapSection from "@/components/contact/MapSection";
import Breadcrumb from "@/components/common/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Flora & Grace. We're here to help with orders, custom arrangements, wedding florals, and more.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-br from-sage-50 to-cream-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Contact" }]} className="mb-6" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-sage-900 mb-3">
            Get in Touch
          </h1>
          <p className="font-body text-lg text-sage-600 max-w-xl">
            Whether you have a question, need a custom arrangement, or just want
            to say hello — we&apos;d love to hear from you.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </div>

      <MapSection />
    </>
  );
}