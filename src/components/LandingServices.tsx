import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const LandingServices = () => {
  return (
    <div>
      <CardHeader className="text-center">
        <CardTitle className="mb-4">Services</CardTitle>
        <CardDescription>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <p>Showcase your talent</p>
            <p>Get hired based on your preferences</p>
            <p>Get hired for government projects in your area</p>
            <p>Have your own financial dashboard that tracks your funds, balance, and transactions</p>
            <p>Become an individual employer and decide your own pay scale</p>
            <p>Get AI-based recommendations based on your skills</p>
            <p>Hire talents based on your job postings</p>
            <p>Get help from our Chatbot</p>
            <p>Discover Government Employment Schemes</p>
          </div>
        </CardDescription>
      </CardHeader>
    </div>
  )
}

export default LandingServices;
