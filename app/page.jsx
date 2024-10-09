import TestimonialsCarousel from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Clock, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
    {
        icon: Calendar,
        title: "Create Events",
        description: "Easily set up and customize your event types",
    },
    {
        icon: Clock,
        title: "Manage Availability",
        description: "Define your availability to streamline scheduling",
    },
    {
        icon: LinkIcon,
        title: "Custom Links",
        description: "Share your personalized scheduling link",
    },
];

const howItWorks = [
    { step: "Sign Up", description: "Create your free Schedulrr account" },
    {
        step: "Set Availability",
        description: "Define when you're available for meetings",
    },
    {
        step: "Share Your Link",
        description: "Send your scheduling link to clients or colleagues",
    },
    {
        step: "Get Booked",
        description: "Receive confirmations for new appointments automatically",
    },
];

export default function Home() {
    return (
        <main className="container px-4 mx-auto py-16">
            <div className="flex flex-col justify-between lg:flex-row items-center gap-6 mb-24 mx-auto">
                <div className="lg:w-1/2">
                    <h1 className="text-7xl font-extrabold pb-6 gradient-title">Simplify Your Scheduling</h1>
                    <p className="text-xl text-gray-600 mb-10">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas optio blanditiis dolorem,
                        molestias rem odio. Quos, corrupti tenetur reiciendis molestiae fugiat fuga.
                    </p>
                    <Link href="/dashboard">
                        <Button size="lg" className="text-lg">
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                    <div className="relative w-full max-w-md aspect-square">
                        <Image src="/poster.png" alt="Illustration" layout="fill" objectFit="contain" />
                    </div>
                </div>
            </div>
            <div className="mb-24">
                <h2 className="text-4xl text-center mb-12 gradient-title">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <Card key={idx}>
                            <CardHeader>
                                <feature.icon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
                                <CardTitle className="text-center text-blue-600">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-center text-gray-600">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <div className="mb-24">
                <h2 className="text-4xl text-center mb-12 gradient-title">What Our User Says</h2>
                <TestimonialsCarousel />
            </div>
            <div className="mb-24">
                <h2 className="text-4xl text-center mb-12 gradient-title">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {howItWorks.map((step, idx) => (
                        <div key={idx} className="text-center">
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <span className="text-blue-600 font-bold text-xl">{idx + 1}</span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{step.step}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Simplify You Scheduling?</h2>
                <p className="text-xl mb-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam adipisci ab qui accusantium debitis
                    sapiente autem asperiores tempora?
                </p>
                <Link href="/dashboard">
                    <Button size="lg" variant="secondary" className="text-blue-600">
                        Start For Free
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                </Link>
            </div>
        </main>
    );
}
