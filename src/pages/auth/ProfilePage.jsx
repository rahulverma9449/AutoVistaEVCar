import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Mail, Phone, MapPin, Calendar, Camera, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Container } from "@/components/ui/container";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional()
});
function ProfilePage() {
  const navigate = useNavigate();
  const { user, loading, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      bio: ""
    }
  });
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth/signin");
      return;
    }
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || ""
      });
    }
    document.title = "Profile - AutoVista";
    window.scrollTo(0, 0);
  }, [user, loading, navigate, form]);
  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await updateProfile(values);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated."
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700" /></div>;
  }
  if (!user) {
    return null;
  }
  return <div className="mt-20 py-8"><Container><div className="max-w-4xl mx-auto"><div className="mb-6"><Button
    variant="ghost"
    onClick={() => navigate(-1)}
    className="mb-4"
  ><ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button><div className="flex items-center justify-between"><div><h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Profile
                </h1><p className="text-slate-600 dark:text-slate-400 mt-1">
                  Manage your account settings and preferences
                </p></div>{!isEditing && <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>}</div></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-8">{
    /* Profile Card */
  }<div className="lg:col-span-1"><Card><CardHeader className="text-center"><div className="relative mx-auto"><Avatar className="h-24 w-24 mx-auto"><AvatarImage src={user.avatar} alt={user.name} /><AvatarFallback className="text-2xl">{user.name.split(" ").map((n) => n[0]).join("").toUpperCase()}</AvatarFallback></Avatar>{isEditing && <Button
    size="icon"
    variant="outline"
    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
  ><Camera className="h-4 w-4" /></Button>}</div><CardTitle className="mt-4">{user.name}</CardTitle><CardDescription>{user.email}</CardDescription></CardHeader><CardContent><div className="space-y-4"><div className="flex items-center gap-3 text-sm"><Calendar className="h-4 w-4 text-slate-500" /><span>Joined December 2024</span></div>{user.provider && <div className="flex items-center gap-3 text-sm"><User className="h-4 w-4 text-slate-500" /><span>Signed up with {user.provider}</span></div>}</div></CardContent></Card></div>{
    /* Profile Form */
  }<div className="lg:col-span-2"><Card><CardHeader><CardTitle>Personal Information</CardTitle><CardDescription>
                    Update your personal details and contact information
                  </CardDescription></CardHeader><CardContent><Form {...form}><form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><FormField
    control={form.control}
    name="name"
    render={({ field }) => <FormItem><FormLabel>Full Name</FormLabel><FormControl><div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /><Input
      {...field}
      placeholder="Enter your full name"
      className="pl-10"
      disabled={!isEditing}
    /></div></FormControl><FormMessage /></FormItem>}
  /><FormField
    control={form.control}
    name="email"
    render={({ field }) => <FormItem><FormLabel>Email</FormLabel><FormControl><div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /><Input
      {...field}
      type="email"
      placeholder="Enter your email"
      className="pl-10"
      disabled={!isEditing}
    /></div></FormControl><FormMessage /></FormItem>}
  /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><FormField
    control={form.control}
    name="phone"
    render={({ field }) => <FormItem><FormLabel>Phone Number</FormLabel><FormControl><div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /><Input
      {...field}
      placeholder="Enter your phone number"
      className="pl-10"
      disabled={!isEditing}
    /></div></FormControl><FormMessage /></FormItem>}
  /><FormField
    control={form.control}
    name="location"
    render={({ field }) => <FormItem><FormLabel>Location</FormLabel><FormControl><div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" /><Input
      {...field}
      placeholder="Enter your location"
      className="pl-10"
      disabled={!isEditing}
    /></div></FormControl><FormMessage /></FormItem>}
  /></div><FormField
    control={form.control}
    name="bio"
    render={({ field }) => <FormItem><FormLabel>Bio</FormLabel><FormControl><Textarea
      {...field}
      placeholder="Tell us about yourself"
      className="min-h-[100px]"
      disabled={!isEditing}
    /></FormControl><FormMessage /></FormItem>}
  />{isEditing && <div className="flex gap-4 pt-4"><Button
    type="submit"
    disabled={isSubmitting}
    className="bg-blue-700 hover:bg-blue-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
  >{isSubmitting ? <span className="flex items-center"><svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                Saving...
                              </span> : <><Save className="h-4 w-4 mr-2" />
                                Save Changes
                              </>}</Button><Button
    type="button"
    variant="outline"
    onClick={() => {
      setIsEditing(false);
      form.reset();
    }}
    disabled={isSubmitting}
  >
                            Cancel
                          </Button></div>}</form></Form></CardContent></Card></div></div></div></Container></div>;
}
export {
  ProfilePage as default
};
