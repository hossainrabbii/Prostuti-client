"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, BookOpen, Clock, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface Course {
  _id: string;
  name: string;
  length: string;
  price: number;
  discountPrice?: number;
  diountPrice?: number; // ব্যাকএন্ড টাইপো হ্যান্ডেলার
  description: string;
}

interface CoursesSectionProps {
  courses: Course[];
  isLoading?: boolean;
  success: boolean;
  onRetry?: () => void;
}

// 🎯 মূল সেকশন কম্পোনেন্ট
function CoursesSection({ courses, isLoading, success, onRetry }: CoursesSectionProps) {
  
  if (!success) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-md text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive shadow-sm">
            <AlertCircle className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">নেটওয়ার্ক কানেকশন সমস্যা!</h3>
          <p className="text-sm text-muted-foreground mb-6">
            দুঃখিত, কোর্সগুলোর তালিকা লোড করা সম্ভব হচ্ছে না। আবার চেষ্টা করুন।
          </p>
          {onRetry && (
            <Button onClick={onRetry} variant="outline" className="gap-2 mx-auto">
              <RefreshCw className="h-4 w-4" /> আবার চেষ্টা করুন
            </Button>
          )}
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="h-8 w-48 bg-muted rounded mx-auto mb-12 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="border border-border/40 rounded-2xl p-6 h-72 bg-card/50 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-3">
            <BookOpen className="h-3.5 w-3.5" /> আমাদের লাইভ কোর্সসমূহ
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            আপনার স্বপ্নের ক্যারিয়ার গড়ার প্রস্তুতি
          </h2>
        </div>

        {/* কোর্স গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {courses?.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

// 📦 প্রতিটি সিঙ্গেল কোর্সের জন্য আলাদা সাব-কম্পোনেন্ট (State আইসোলেশনের জন্য)
function CourseCard({ course }: { course: Course }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayDiscountPrice = course.discountPrice ?? course.diountPrice ?? course.price;
  const savings = course.price - displayDiscountPrice;
  
  // ডেসক্রিপশন বড় কিনা তা চেক করার লজিক (১৬০ ক্যারেক্টারের বেশি হলে বাটন দেখাবে)
  const isLongDescription = course.description.length > 160;

  return (
    <div className="group border border-border/60 rounded-2xl bg-card p-6 flex flex-col justify-between hover:border-primary/40 hover:shadow-xl hover:shadow-primary/[0.02] transition-all duration-300 h-full">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
            <Clock className="h-3.5 w-3.5 text-primary" /> {course.length}
          </div>
          {savings > 0 && (
            <span className="text-[10px] uppercase tracking-wider font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded">
              {savings}৳ ছাড়
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
          {course.name}
        </h3>

        <p className={`text-sm text-muted-foreground leading-relaxed whitespace-pre-line transition-all duration-300 ${
          isExpanded ? "" : "line-clamp-4"
        }`}>
          {course.description}
        </p>

        {isLongDescription && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-bold text-primary hover:text-primary/80 transition-colors mt-2 mb-4 block underline focus:outline-none"
          >
            {isExpanded ? "কমিয়ে দেখুন ▲" : "আরো পড়ুন ▼"}
          </button>
        )}
      </div>

      <div className={`border-t border-border/40 pt-4 ${isExpanded ? "mt-6" : "mt-auto"}`}>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-black text-foreground">
            ৳{displayDiscountPrice}
          </span>
          {savings > 0 && (
            <span className="text-sm text-muted-foreground line-through decoration-destructive/60">
              ৳{course.price}
            </span>
          )}
        </div>

        <Link href="/student-login" className="block w-full">
          <Button className="w-full bg-gradient-primary shadow-md hover:opacity-95 text-primary-foreground font-medium gap-1.5 justify-center">
            ভর্তি হোন <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CoursesSection;