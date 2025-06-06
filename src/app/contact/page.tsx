import ContactFormComponent from '@/components/contact/ContactForm';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-primary">
        Get In Touch
      </h1>
      <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
        We&apos;re excited to hear about your project! Fill out the form below, or reach out to us via phone or email.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold">Our Office</h3>
                <p className="text-muted-foreground">123 AdCraft Avenue, Creative City, CC 12345</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold">Email Us</h3>
                <a href="mailto:hello@adcraft.studio" className="text-muted-foreground hover:text-primary">hello@adcraft.studio</a>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold">Call Us</h3>
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary">+1 (234) 567-890</a>
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Office Hours: Monday - Friday, 9:00 AM - 6:00 PM
          </p>
        </div>

        <div>
          <ContactFormComponent />
        </div>
      </div>
    </div>
  );
}
