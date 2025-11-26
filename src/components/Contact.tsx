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

const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  subject: z.string()
    .trim()
    .min(1, { message: "Subject is required" })
    .max(150, { message: "Subject must be less than 150 characters" }),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    console.log("Form data:", data);
    toast.success("Message received! I'll get back to you soon.");
    form.reset();
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "#",
      handle: "@yourprofile",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "#",
      handle: "@yourhandle",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:your.email@example.com",
      handle: "your.email@example.com",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="font-mono text-primary text-sm mb-4">
              <span className="terminal-cursor">$ initiate contact_protocol</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ESTABLISH <span className="text-primary">CONNECTION</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Available for collaboration on cybersecurity projects, AI research, 
              and technical consultations. Let's build secure, intelligent systems together.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Get In Touch Section */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-primary">▸</span>
                  GET IN TOUCH
                </h3>
                
                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
                    >
                      <div className="p-2 bg-muted group-hover:bg-primary/10 transition-colors">
                        <link.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-mono text-sm text-muted-foreground">
                          {link.name}
                        </div>
                        <div className="text-sm font-medium group-hover:text-primary transition-colors">
                          {link.handle}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-muted/30 border border-border">
                <div className="font-mono text-xs space-y-2">
                  <div>
                    <span className="text-primary">[STATUS]</span>
                    <span className="text-muted-foreground"> OPERATIONAL</span>
                  </div>
                  <div>
                    <span className="text-primary">[RESPONSE]</span>
                    <span className="text-muted-foreground"> 24-48H</span>
                  </div>
                  <div>
                    <span className="text-primary">[ENCRYPTION]</span>
                    <span className="text-muted-foreground"> ENABLED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="md:col-span-3">
              <div className="bg-card border border-border p-8">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-primary">▸</span>
                  SEND MESSAGE
                </h3>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-xs text-muted-foreground">
                              NAME
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                className="bg-background border-border focus:border-primary"
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
                            <FormLabel className="font-mono text-xs text-muted-foreground">
                              EMAIL
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                className="bg-background border-border focus:border-primary"
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
                          <FormLabel className="font-mono text-xs text-muted-foreground">
                            SUBJECT
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Project collaboration"
                              className="bg-background border-border focus:border-primary"
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
                          <FormLabel className="font-mono text-xs text-muted-foreground">
                            MESSAGE
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project or inquiry..."
                              className="bg-background border-border focus:border-primary min-h-[150px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
                      disabled={form.formState.isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {form.formState.isSubmitting ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
