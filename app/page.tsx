import LandingPage from "@/components/LandingPage";
import { CourseService } from "@/services/course";

const Page = async () => {
  let coursesResponse;

  try {
    // সার্ভার সাইড থেকে ডাটা ফেচ করা হচ্ছে
    coursesResponse = await CourseService.getAllCourses();
  } catch (error) {
    // কোনো কারণে ব্যাকএন্ড ফেইল করলে সেফটি রিটার্ন
    coursesResponse = {
      success: false,
      message: "Network Error from Server",
      data: [],
    };
  }

  // ডাটাটি প্রপ্স হিসেবে LandingPage-এ পাঠিয়ে দেওয়া হলো
  return <LandingPage coursesResponse={coursesResponse} />;
};

export default Page;