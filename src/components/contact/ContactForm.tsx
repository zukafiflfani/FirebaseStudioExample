
'use ' + 'client'; // Ensure 'use client' is on the first line

import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { handleContactFormSubmit, type ContactFormState } from '@/app/actions';
import { Send } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Schema can remain in English as it's for validation logic, not display
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const initialState: ContactFormState = {
  message: '',
  success: false,
};

export default function ContactFormComponent() {
  const { toast } = useToast();
  const { t, isLoading } = useLanguage();
  const [state, formAction, isPending] = useActionState(handleContactFormSubmit, initialState);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          // Server action responses are not translated in this iteration
          title: t('contact.form.toast.successTitle'),
          description: state.message, 
        });
        form.reset(); 
      } else {
        toast({
          title: t('contact.form.toast.errorTitle'),
          description: state.message || 'Failed to send message. Please try again.',
          variant: 'destructive',
        });
      }
    }
  }, [state, toast, form, t]);

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-xl mx-auto bg-card p-8 rounded-lg shadow-xl">
        <p>Loading form...</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8 max-w-xl mx-auto bg-card p-8 rounded-lg shadow-xl">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact.form.nameLabel')}</FormLabel>
              <FormControl>
                <Input placeholder={t('contact.form.namePlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact.form.emailLabel')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t('contact.form.emailPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact.form.messageLabel')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('contact.form.messagePlaceholder')}
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isPending}>
          <Send className="mr-2 h-4 w-4" /> 
          {isPending ? t('contact.form.button.sending') : t('contact.form.button.send')}
        </Button>
      </form>
    </Form>
  );
}
