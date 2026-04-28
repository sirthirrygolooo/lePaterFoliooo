import { Mail, Linkedin, Github, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

// --- CONFIGURATION EMAILJS (REMPLACEZ CES VALEURS !) ---
// Ces identifiants sont nécessaires pour que l'envoi fonctionne.
const SERVICE_ID = 'service_wy9xpkl';
const TEMPLATE_ID = 'template_tkiudm5';
const PUBLIC_KEY = 'C31kL0680g3qaho0p';
// ----------------------------------------------------


const CONTACT_CONFIG = {
  socialLinks: [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/jean-baptiste-froehly/",
      handle: "/in/jean-baptiste-froehly",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/sirthirrygolooo",
      handle: "github.com/jb_frhl",
    },
    {
      name: "Adresse Email",
      icon: Mail,
      url: "mailto:jean-baptiste.froehly@protonmail.com",
      handle: "jean-baptiste.froehly@protonmail.com",
    },
  ],
  statusInfo: [
    { label: "STATUS", value: "OUVERT AUX STAGES" },
    { label: "RESPONSE", value: "24-48H" },
  ]
};

const contactSchema = z.object({
  name: z.string()
      .trim()
      .min(1, { message: "Nom requis" })
      .max(100, { message: "Le nom doit faire moins de 100 caractères" }),
  email: z.string()
      .trim()
      .email({ message: "Adresse mail invalide" })
      .max(255, { message: "L'adresse mail doit faire moins de 255 caractères" }),
  subject: z.string()
      .trim()
      .min(1, { message: "Sujet requis" })
      .max(150, { message: "Le sujet doit faire moins de 150 caractères" }),
  message: z.string()
      .trim()
      .min(10, { message: "Le message doit faire au moins 10 caractères 😉" })
      .max(1000, { message: "Le message ne doit pas dépasser 1000 caractères 🥵" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {

  // Optionnel: S'assurer que le service est initialisé au chargement (si vous utilisez le SDK npm)
  useEffect(() => {
    // @ts-ignore
    if (PUBLIC_KEY && PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      // emailjs.init(PUBLIC_KEY); // Optionnel si l'envoi direct est utilisé
    }
  }, []);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [submitProgress, setSubmitProgress] = useState(0);

  const getSubmitProgressBar = (progress: number) => {
      const totalBlocks = 10;
      const validProgress = isNaN(progress) ? 0 : progress;
      const filledBlocks = Math.max(0, Math.min(10, Math.floor(validProgress / 10)));
      const emptyBlocks = Math.max(0, totalBlocks - filledBlocks);
      return `[${'█'.repeat(filledBlocks)}${'-'.repeat(emptyBlocks)}] ${validProgress}%`;
  };

  const onSubmit = async (data: ContactFormValues) => {

    // Vérification de la configuration
    // @ts-ignore
    if (SERVICE_ID === 'YOUR_SERVICE_ID' || TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      console.warn("EmailJS non configuré. Simulation d'envoi.");
      toast.warning("L'envoi est en mode simulation. Configurez vos identifiants EmailJS.");
      form.reset();
      return;
    }

    // Construction de l'objet de données pour EmailJS
    const templateParams = {
      user_name: data.name,
      user_email: data.email,
      subject: data.subject,
      message: data.message,
    };

    setSubmitProgress(0);
    const interval = setInterval(() => {
      setSubmitProgress(prev => {
         const next = prev + Math.floor(Math.random() * 20) + 5;
         return next > 90 ? 90 : next;
      });
    }, 150);

    try {
      // Envoi via emailjs.send
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      clearInterval(interval);
      setSubmitProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));

      if (response.status === 200) {
        toast.success("Message envoyé ! Je reviens vite vers vous.");
        form.reset();
      } else {
        console.error("Erreur EmailJS:", response);
        toast.error(`Échec de l'envoi (Code ${response.status}). Vérifiez votre configuration EmailJS.`);
      }

    } catch (error) {
      clearInterval(interval);
      setSubmitProgress(0);
      console.error("Erreur réseau/connexion:", error);
      toast.error("Erreur de connexion. Veuillez vérifier votre réseau.");
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  };

  return (
      <section id="me contacter" className="py-16 sm:py-24 bg-background relative overflow-hidden">
        {/* Parallax Grid Background */}
        <div className="absolute inset-0 z-0 grid-background opacity-10 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <div className="font-mono text-primary text-xs sm:text-sm mb-4">
                <span className="terminal-cursor">$ initiate contact_protocol</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 break-words">
                [<span className="text-primary">{getCurrentTime()}</span>]~$ CONNEXION <span className="text-primary">ÉTABLIE...</span>
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Toujours volontaire pour de nouveaux projets, n'hésitez pas à me contacter via le formulaire ou par l'un des moyens listés ci-dessous.
                Vous trouverez également de quoi en découvrir un peu plus sur mon travail et mes intérêts.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6 sm:gap-8 items-start">

              <div className="md:col-span-2 space-y-8">

                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 font-mono">
                    <span className="text-primary">//</span>
                    <span className="text-lg uppercase">Mes Plateformes</span>
                  </h3>

                  <div className="space-y-3">
                    {CONTACT_CONFIG.socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 font-mono text-sm border-b border-border hover:text-primary transition-colors"
                        >
                          <link.icon className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-muted-foreground">{link.name}:</span>
                          <span className="truncate flex-1">{link.handle}</span>
                        </a>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-muted/30 border border-border mt-8 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)] transition-all duration-300 relative overflow-hidden group">
                  {/* Scanline effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-linear pointer-events-none"></div>
                  
                  <div className="font-mono text-xs space-y-2 relative z-10">
                    <h4 className="text-sm font-bold mb-3 text-primary uppercase">
                      Connection Manifest
                    </h4>
                    {CONTACT_CONFIG.statusInfo.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-primary">[{item.label}]</span>
                          <span className="text-muted-foreground">{item.value}</span>
                        </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="bg-card border border-border p-8 shadow-xl hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)] transition-all duration-300 relative overflow-hidden group">
                  {/* Scanline effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-linear pointer-events-none"></div>
                  
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 font-mono relative z-10">
                    <span className="text-primary">//</span>
                    <span className="text-lg uppercase">Envoyer un message</span>
                  </h3>

                  <div className="relative z-10">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-mono text-xs text-primary uppercase">
                                    NOM *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                        placeholder="Gerard Menvussa"
                                        className="bg-background border-border focus:ring-primary focus:border-primary"
                                        {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="font-mono text-xs text-primary uppercase">
                                    EMAIL *
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="gerard.menvussa@unmail.com"
                                        className="bg-background border-border focus:ring-primary focus:border-primary"
                                        {...field}
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                      </div>

                      <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-mono text-xs text-primary uppercase">
                                  OBJET *
                                </FormLabel>
                                <FormControl>
                                  <Input
                                      placeholder="Proposition de projet cyber"
                                      className="bg-background border-border focus:ring-primary focus:border-primary"
                                      {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                          )}
                      />

                      <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="font-mono text-xs text-primary uppercase">
                                  MESSAGE *
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                      placeholder="Décrivez votre projet ici..."
                                      className="bg-background border-border focus:ring-primary focus:border-primary min-h-[150px] resize-none"
                                      {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs" />
                              </FormItem>
                          )}
                      />

                      <Button
                          type="submit"
                          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-base tracking-widest transition-all duration-300"
                          disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (
                            getSubmitProgressBar(submitProgress)
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-3" />
                                ENVOYER LE MESSAGE
                            </>
                        )}
                      </Button>
                    </form>
                  </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Contact;