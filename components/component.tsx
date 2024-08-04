"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

interface IconProps {
  className?: string;
  [key: string]: any;
}

export default function Component() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    essay: "",
    wordCount: 0,
    additionalComment: "",
  });
  const [cost, setCost] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "wordCount" ? parseInt(value, 10) || 0 : value,
    }));

    if (id === "wordCount") {
      const wordCount = parseInt(value, 10) || 0;
      const calculatedCost = wordCount * 0.1;
      setCost(parseFloat(calculatedCost.toFixed(2)));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Successfully submitted!");
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  return (
    <React.Fragment>
      <header className="bg-[#A51C30] text-white py-4 px-6 md:px-12">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BookIcon className="w-8 h-8" />
            <h1 className="text-2xl font-sans font-bold">Harvard Essay Review</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <button
              className="hover:underline font-sans text-white"
              onClick={() =>
                document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Home
            </button>
            <button
              className="hover:underline font-sans text-white"
              onClick={() =>
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              About
            </button>
            <button
              className="hover:underline font-sans text-white"
              onClick={() =>
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              How It Works
            </button>
            <button
              className="hover:underline font-sans text-white"
              onClick={() =>
                document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started
            </button>
          </nav>
          <Button
            className="font-sans"
            onClick={() =>
              document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Get Started
          </Button>
        </div>
      </header>
      <main>
        <section id="home" className="bg-[#A51C30] text-white py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">
                Affordable Essay Review by a Harvard Student
              </h2>
              <p className="text-lg font-sans mb-8">
                Elevate your essays with expert feedback from a Harvard student. My affordable
                service ensures your essay stands out in competitive applications, giving you a
                crucial edge.
              </p>
              <div className="flex items-center space-x-4">
                <Button
                  variant="learnMore"
                  onClick={() =>
                    document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get Started
                </Button>
                <p className="text-lg font-sans">Reviewed by a Harvard student</p>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                alt="Essay Review"
                className="w-full max-w-md rounded-lg shadow-lg"
                height={400}
                src="/chris.png"
                style={{ aspectRatio: "500/400", objectFit: "cover", objectPosition: "top" }}
                width={500}
              />
            </div>
          </div>
        </section>
        <section id="how-it-works" className="bg-gray-100 py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-8 text-center text-black">
              How it Works
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <UploadIcon className="w-12 h-12 mb-4 text-[#A51C30] mx-auto" />
                <h3 className="text-xl font-sans font-bold mb-2 text-black">Upload Your Essay</h3>
                <p className="text-gray-600 font-sans text-black">
                  Share a link to your Google Docs essay with editing privileges. My process is
                  secure and easy to follow.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <CheckIcon className="w-12 h-12 mb-4 text-[#A51C30] mx-auto" />
                <h3 className="text-xl font-sans font-bold mb-2 text-black">Get Reviewed</h3>
                <p className="text-gray-600 font-sans text-black">
                  Your essay will be reviewed by me within 48 hours. Get comprehensive feedback
                  quickly and efficiently.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <ReplyIcon className="w-12 h-12 mb-4 text-[#A51C30] mx-auto" />
                <h3 className="text-xl font-sans font-bold mb-2 text-black">Receive Feedback</h3>
                <p className="text-gray-600 font-sans text-black">
                  Receive detailed, actionable feedback to improve your essay&apos;s quality and
                  effectiveness.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <FilePenIcon className="w-12 h-12 mb-4 text-[#A51C30] mx-auto" />
                <h3 className="text-xl font-sans font-bold mb-2 text-black">3 Edits Guaranteed</h3>
                <p className="text-gray-600 font-sans text-black">
                  I offer up to 3 rounds of edits to ensure your complete satisfaction.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="bg-[#A51C30] text-white py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8 md:gap-32 items-center">
            <div className="flex flex-col items-center md:justify-center md:space-y-8">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/2Mvw7ZQ-abY?si=Kamm-wsEDXK3HoSW"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full max-w-md rounded-lg shadow-lg mb-8"
              />
              <Carousel className="w-full max-w-md mb-4" style={{ height: "655px" }}>
                <CarouselContent className="flex">
                  <CarouselItem>
                    <div className="flex justify-center items-center h-full">
                      <Image
                        alt="Testimonial 1"
                        src="/testimonial1.jpg"
                        className="carousel-image rounded-lg"
                        layout="responsive"
                        width={500}
                        height={400}
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="flex justify-center items-center h-full">
                      <Image
                        alt="Testimonial 2"
                        src="/testimonial2.jpg"
                        className="carousel-image rounded-lg"
                        layout="responsive"
                        width={500}
                        height={400}
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="flex justify-center items-center h-full">
                      <Image
                        alt="Testimonial 3"
                        src="/testimonial3.jpg"
                        className="carousel-image rounded-lg"
                        layout="responsive"
                        width={500}
                        height={400}
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="flex justify-center items-center h-full">
                      <Image
                        alt="Testimonial 4"
                        src="/testimonial4.jpg"
                        className="carousel-image rounded-lg"
                        layout="responsive"
                        width={500}
                        height={400}
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-sans font-bold mb-4">About Me</h2>
              <p className="text-lg font-sans mb-8">
                Hello! I’m an incoming freshman at Harvard College planning on concentrating in
                Chemical and Physical Biology on the pre-medical pathway. My own essays, especially
                my common application personal statement, were some of the strongest parts of my
                applicant (coming directly from my Yale Admissions Officer), and I’m passionate
                about helping students edit their college essays.
              </p>
              <p className="text-lg font-sans mb-8">My college acceptances include:</p>
              <ul className="list-disc list-inside text-lg font-sans mb-8">
                <li>Harvard College (with a likely letter)</li>
                <li>Yale University (with a likely letter)</li>
                <li>Princeton University</li>
                <li>Johns Hopkins University</li>
                <li>Northwestern University</li>
                <li>Duke University</li>
                <li>Cornell University</li>
                <li>Tufts University</li>
                <li>Emory University</li>
                <li>University of Richmond (with a full ride)</li>
                <li>Case Western Reserve University</li>
                <li>Northeastern University</li>
                <li>UMass Amherst</li>
                <li>Tulane University</li>
                <li>UMass Boston</li>
              </ul>
              <p className="text-lg font-sans mb-8">
                I am dedicated to providing high-quality feedback to help you improve your essays.
                With my guidance, you can refine your work to perfection.
              </p>
            </div>
          </div>
        </section>
        <section id="get-started" className="bg-white text-black py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-sans font-bold mb-8 text-center">Get Started</h2>
            <form className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div>
                  <Label className="font-sans text-black" htmlFor="name">
                    Full Name
                  </Label>
                  <Input className="font-sans text-black" id="name" placeholder="Enter your name" type="text" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                  <Label className="font-sans text-black" htmlFor="email">
                    Email
                  </Label>
                  <Input className="font-sans text-black" id="email" placeholder="Enter your email" type="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <Label className="font-sans text-black" htmlFor="phoneNumber">
                    Phone Number
                  </Label>
                  <Input
                    className="font-sans text-black"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label className="font-sans text-black" htmlFor="essay">
                    Essay Link
                  </Label>
                  <Input className="font-sans text-black" id="essay" placeholder="Provide a link to your Google Docs essay" type="text" value={formData.essay} onChange={handleChange} />
                </div>
                <div>
                  <Label className="font-sans text-black" htmlFor="wordCount">
                    Word Count (Enter word count for pricing)
                  </Label>
                  <Input className="font-sans text-black" id="wordCount" placeholder="Enter total word count" type="number" value={formData.wordCount} onChange={handleChange} />
                </div>
                <div>
                  <Label className="font-sans text-black" htmlFor="additionalComment">
                    Additional Comment
                  </Label>
                  <textarea
                    className="font-sans text-black border rounded-md px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 w-full"
                    id="additionalComment"
                    placeholder="Enter any additional comments"
                    value={formData.additionalComment}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p className="font-sans text-black">
                    Cost: <span id="cost">${cost}</span>
                  </p>
                </div>
              </div>
              <Button className="mt-6 w-full font-sans" variant="primary" type="submit">
                Submit
              </Button>
            </form>
            <p className="text-center mt-8">After you submit the form, I will reach out to you about the payments. Payments integrated into the website feature will be coming soon. Thank you for your patience.</p>
          </div>
        </section>
      </main>
      <footer className="bg-[#A51C30] text-white py-6">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <p className="text-sm font-sans">© 2024 Harvard Essay Review. All rights reserved.</p>
          <p className="text-sm font-sans">Support: chrisanderp.college@gmail.com</p>
          <p className="text-sm font-sans">
            Website created by&nbsp;
            <a className="hover:underline" href="#">
              Kim Khoi Lam
            </a>
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
}

const BookIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
};

const CheckIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
};

const FilePenIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
};

const ReplyIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
};

const UploadIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
};

const XIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};
