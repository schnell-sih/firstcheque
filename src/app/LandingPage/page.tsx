import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import LandingAbout from '@/components/LandingAbout'
import LandingServices from '@/components/LandingServices'
import HeroElement from '@/components/HeroElement'
import Footer from '@/components/Footer'

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center text-center justify-center">
        <HeroElement/>
        <div className="flex justify-center mx-16 mb-52">
            <Card>
               <LandingAbout/>
                <LandingServices/>
            </Card>
        </div>
       <Footer/>
    </div>
  )
}

export default LandingPage;
