"use client";

import CustomImage from "@/components/shared/CustomImage";
import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { usePostContact } from "@/lib/hooks/useContact";
import { useServicePageTitle } from "@/lib/hooks/useService";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const postContactMutation = usePostContact();
  const { data: servicesData, isLoading: isLoadingServices } =
    useServicePageTitle();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
    const MAX_MEGAPIXELS = 10;
    const IMAGE_FORMATS = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const ALLOWED_FORMATS = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      ...IMAGE_FORMATS,
    ];

    // Validate file type
    if (!ALLOWED_FORMATS.includes(file.type)) {
      toast.error("Invalid file format. Allowed: PDF, DOCX, XLSX, PPTX, JPG, PNG, WebP, GIF");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      toast.error(`File size (${fileSizeMB} MB) exceeds the maximum limit of 25 MB`);
      return;
    }

    // For image files, validate dimensions/megapixels
    if (IMAGE_FORMATS.includes(file.type)) {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        const megapixels = (img.width * img.height) / 1000000;
        URL.revokeObjectURL(objectUrl);

        if (megapixels > MAX_MEGAPIXELS) {
          toast.error(
            `Image resolution (${megapixels.toFixed(2)} MP) exceeds the maximum limit of ${MAX_MEGAPIXELS} MP. Please use a lower resolution image.`
          );
        } else {
          setUploadedFile(file);
          toast.success(`Image "${file.name}" validated and selected (${img.width}x${img.height})`);
        }
      };

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        toast.error("Failed to load image. Please ensure you've selected a valid image file.");
      };

      img.src = objectUrl;
      return;
    }

    // Non-image files pass through directly
    setUploadedFile(file);
    toast.success(`File "${file.name}" selected`);
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function onSubmit(data: FormValues) {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("service", data.service);
    formData.append("message", data.message);

    if (uploadedFile) {
      formData.append("file", uploadedFile);
    }
 
    postContactMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Thank you! Your message has been sent successfully.");
        form.reset();
        setUploadedFile(null);
      },
      onError: (error) => {
        console.error("Submission error:", error);
        toast.error(
          (error as Error).message ||
            "Something went wrong. Please try again later.",
        );
      },
    });
  }

  const isSubmitting = postContactMutation.isPending;

  const servicesOptions =
    servicesData?.data?.map(
      (service: { _id: string; title: string }) => ({
        value: service.title,
        label: service.title,
      }),
    ) || [];

  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image */}
          <div className="relative hidden rounded-tr-[15%] rounded-bl-[10%] overflow-hidden  md:block">
            <CustomImage
              src="/images/contact.jpg"
              alt="Contact us"
              fill
              className="object-cover"
            />
          </div>

          {/* Form */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Get in Touch</h2>
            <p className="mt-2 text-base text-slate-600">
              Our friendly team would love to hear from you
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 space-y-5"
              >
                {/* First Name & Last Name */}
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name here" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name here" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email Address */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1(555) 000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Services */}
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Services</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingServices ? (
                            <SelectItem value="loading" disabled>
                              Loading services...
                            </SelectItem>
                          ) : servicesOptions.length > 0 ? (
                            servicesOptions.map((service: { value: string; label: string }) => (
                              <SelectItem
                                key={service.value}
                                value={service.value}
                              >
                                {service.label}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              No services available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your message here..."
                          className="min-h-32 focus-visible:ring-[#086646]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Attachment */}
                <div
                  className={`rounded-md border border-dashed p-6 text-center transition-colors ${
                    uploadedFile
                      ? "border-[#086646] bg-[#086646]/5"
                      : "border-slate-300 bg-slate-50"
                  }`}
                >
                  <Upload
                    className={`mx-auto h-8 w-8 ${uploadedFile ? "text-[#086646]" : "text-slate-400"}`}
                  />
                  <h5 className="mt-2 text-base font-semibold text-slate-900">
                    Upload Supporting Documents
                  </h5>
                  <p className="mt-1 text-sm text-slate-600">
                    Formats: PDF, DOCX, XLSX, PPTX, JPG, PNG, WebP, GIF — Max 25 MB
                  </p>

                  {uploadedFile && (
                    <div className="mt-3 flex items-center justify-center gap-2">
                      <span className="text-sm font-medium text-[#086646]">
                        ✓ {uploadedFile.name}
                      </span>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.gif"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  {!uploadedFile && (
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-3 text-base border-slate-300 hover:bg-slate-100"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose File
                    </Button>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-base cursor-pointer"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
