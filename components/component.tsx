"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Component() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    social: "",
    essay: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/submit", {
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
    <>
      <header className="bg-primary text-secondary py-4 px-6 md:px-12">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BookIcon className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Harvard Essay Review</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link className="hover:underline text-secondary" href="#">
              Home
            </Link>
            <Link className="hover:underline text-secondary" href="#">
              About
            </Link>
            <Link className="hover:underline text-secondary" href="#">
              Pricing
            </Link>
            <Link className="hover:underline text-secondary" href="#">
              Contact
            </Link>
          </nav>
          <Button variant="default">Get Started</Button>
        </div>
      </header>
      <main>
        <section className="bg-primary text-secondary py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Affordable Essay Review by a Harvard Student</h2>
              <p className="text-lg mb-8">Get your essays reviewed by a Harvard student for only $5 per essay.</p>
              <div className="flex items-center space-x-4">
                <div className="bg-secondary text-primary font-bold py-2 px-4 rounded-full">$5 per essay</div>
                <p className="text-lg">Reviewed by a Harvard student</p>
              </div>
            </div>
            <div className="flex justify-end">
              <img
                alt="Essay Review"
                className="w-full max-w-md rounded-lg shadow-lg"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
            </div>
          </div>
        </section>
        <section className="bg-gray-100 py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-black">How it Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <UploadIcon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2 text-black">Upload Your Essay</h3>
                <p className="text-gray-600">Provide a link to your Google Docs essay with editing privileges.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <ViewIcon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2 text-black">Get Reviewed</h3>
                <p className="text-gray-600">Your essay will be reviewed by a Harvard student within 24 hours.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <ReplyIcon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2 text-black">Receive Feedback</h3>
                <p className="text-gray-600">Get detailed feedback to improve your essay.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-primary text-secondary py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                alt="Harvard Student"
                className="w-full max-w-md rounded-lg shadow-lg"
                height={400}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "500/400",
                  objectFit: "cover",
                }}
                width={500}
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">Reviewed by a Harvard Student</h2>
              <p className="text-lg mb-8 text-secondary">
                Our Harvard student is dedicated to providing high-quality feedback to help you improve your essays.
              </p>
              <Button variant="learnMore">Learn More</Button>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-black">Get Started</h2>
            <form className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
              <div className="grid gap-6">
                <div>
                  <Label htmlFor="name" className="form-label">Full Name</Label>
                  <Input id="name" placeholder="Enter your name" type="text" className="input" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="email" className="form-label">Email</Label>
                  <Input id="email" placeholder="Enter your email" type="email" className="input" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="social" className="form-label">Social Media Handles</Label>
                  <Input id="social" placeholder="Enter your social media handles" type="text" className="input" value={formData.social} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="essay" className="form-label">Essay Link</Label>
                  <Input id="essay" placeholder="Provide a link to your Google Docs essay" type="text" className="input" value={formData.essay} onChange={handleChange} />
                </div>
              </div>
              <Button className="mt-6 w-full" type="submit" variant="primary">
                Submit ✨
              </Button>
            </form>
          </div>
        </section>
      </main>
      <footer className="bg-primary text-secondary py-6">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <p className="text-sm">© 2024 Harvard Essay Review. All rights reserved.</p>
          <p className="text-sm">
            Website created by&nbsp;
            <a className="hover:underline text-secondary" href="#">
              Kim Khoi Lam
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
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
}

function ReplyIcon(props: React.SVGProps<SVGSVGElement>) {
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
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
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
}

function ViewIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
    </svg>
  );
}
