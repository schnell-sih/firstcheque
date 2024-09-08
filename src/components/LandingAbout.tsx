import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
const LandingAbout = () => {
  return (
    <div>
    <CardHeader>
    <CardTitle className='mb-4'>About</CardTitle>
    <CardDescription >
        <p>
        Welcome to FirstCheque! We are a government-approved and funded freelancing platform dedicated to connecting skilled professionals with businesses, private organizations, and government projects. Our goal is to create a reliable and efficient space where freelancers and employers can come together to achieve great things.
        At FirstCheque, we understand the diverse needs of both freelancers and employers. 
        We are proud to cater to a wide range of industries, ensuring that our platform offers diverse opportunities for freelancers. From creative roles like graphic design and writing to technical positions such as software development and data analysis, there is a broad spectrum of job categories available. Our platform is designed to offer flexibility, accommodating both short-term gigs and long-term contracts.
        As a government-endorsed initiative, we place a strong emphasis on transparency, reliability, and secure transactions. Our platform ensures that all interactions are safe and that freelancers and employers can trust the services we provide. Additionally, we offer an AI-powered chatbot that provides job recommendations tailored to your skills, location, and job history. This feature helps you find the best opportunities based on your unique profile, enhancing your job search experience.
        By joining FirstCheque, you are becoming part of a forward-thinking community that is reshaping the future of freelancing. We are committed to fostering an environment where both freelancers and employers can thrive, and we are excited to support you in achieving your professional goals. Explore our platform today and discover how we can help you succeed!
        </p>
    </CardDescription>
</CardHeader></div>
  )
}

export default LandingAbout;