import { useEffect } from 'react';
import { Check, MessageCircle, ArrowRight } from 'lucide-react';
import { Navigation } from './Navigation';
import { goHome, getStoredLeadName } from '../utils/navigation';
import { trackThankYouPageView, trackWhatsAppClick } from '../utils/tracking';

const WHATSAPP_HREF =
  'https://wa.me/447466754555?text=Hi%20Swiftrooms%2C%20I%27d%20like%20to%20speak%20with%20an%20expert%20about%20windows%2C%20doors%20or%20a%20glass%20room%20for%20my%20villa.';

/**
 * Dedicated /thank-you view shown after a lead form submission (and directly
 * addressable — a refresh or a bookmark still lands here). Kept outside the
 * scroll container the rest of the page uses, since there's nothing to
 * scroll to below it.
 */
export function ThankYouPage() {
  const name = getStoredLeadName();

  useEffect(() => {
    trackThankYouPageView();
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <Navigation />

      <div className="flex-1 flex items-center justify-center px-4 py-16 lg:py-24">
        <div className="max-w-xl w-full text-center space-y-6">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#007969] rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 lg:w-12 lg:h-12 text-white" strokeWidth={3} />
          </div>

          <div>
            <h1 className="font-heading text-2xl lg:text-4xl font-semibold text-[#1c1c1e] mb-3 break-words">
              {name ? `Thank You, ${name}!` : 'Thank You!'}
            </h1>
            <p className="font-body text-base lg:text-lg text-[#3a3a3c] mb-2">
              We truly appreciate you taking the time to reach out to us.
            </p>
            <p className="font-body text-base lg:text-lg text-[#3a3a3c]">
              Your quote request has been received and our team will contact you shortly.
            </p>
          </div>

          <div className="bg-[#e6f4f1] border border-[#00796933] rounded-[4px] p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-3 text-[#007969]">
              <Check className="w-6 h-6 flex-shrink-0" strokeWidth={2.5} />
              <p className="font-body text-base lg:text-lg font-medium">We respond within 12 hours</p>
            </div>
          </div>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            className="btn-whatsapp inline-flex items-center justify-center gap-2 max-w-sm w-full mx-auto shadow-md hover:shadow-lg transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat With Us on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={goHome}
            className="font-body text-sm text-[#6b7280] underline hover:text-[#1c1c1e] transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
