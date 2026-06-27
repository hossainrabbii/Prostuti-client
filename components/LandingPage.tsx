"use client";
import { useState } from "react";
import { X } from "lucide-react";

import CourseBadgeStrip from "@/components/CourseBadgeStrip";
import FeaturesSection from "@/components/FeaturesSection";
import AudienceSection from "@/components/AudienceSection";
import Hero from "@/components/Hero";
import NavBar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";
import CoursesSection from "./CoursesSection"; 

interface Course {
  _id: string;
  name: string;
  length: string;
  price: number;
  discountPrice?: number;
  diountPrice?: number;
  description: string;
}

interface CoursesResponse {
  success: boolean;
  message: string;
  data: Course[];
}

interface LandingPageProps {
  coursesResponse: CoursesResponse;
}

export default function({ coursesResponse }: { coursesResponse: any }) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  return (
 
    <div className="min-h-screen bg-background font-bangla">
      <NavBar onEnroll={() => setCheckoutOpen(true)} />
      <Hero onEnroll={() => setCheckoutOpen(true)} />
      <CourseBadgeStrip />
      <div id="features">
      <FeaturesSection />
      </div>
      <div id="audience">
      <AudienceSection />
      </div>
      <div id="courses">
      <CoursesSection 
        courses={coursesResponse?.data || []} 
        success={coursesResponse?.success ?? false} 
        isLoading={false}
      />
      </div>
      {/* <PricingSection onEnroll={() => setCheckoutOpen(true)} /> */}
      <Footer />

      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/60 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-background shadow-elegant sm:rounded-3xl">
            <button
              onClick={() => setCheckoutOpen(false)}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-muted"
              aria-label="বন্ধ করুন"
            >
              <X className="h-4 w-4" />
            </button>

            <RegistrationForm />
          </div>
        </div>
      )}
    </div>
  );
}