import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-r from-blue-50 to-indigo-100">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Secure, Smart, and Private Location-Based Queries
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          EPLQ lets you search for Points of Interest (POIs) without ever
          revealing your location. Experience modern spatial privacy with
          blazing-fast search.
        </p>
        <Link to="/register">
          <Button className="text-lg px-6 py-4">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Why Choose EPLQ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p>
                Query the map without exposing your real-time location — thanks
                to our predicate-only encryption.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p>
                Our tree-based index structure makes spatial queries incredibly
                fast, even on mobile networks.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Open & Secure</h3>
              <p>
                Built with modern technologies and strong encryption standards.
                Open source & fully auditable.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Call to Action Section */}
      <section className="py-16 px-6 text-center bg-gradient-to-r from-indigo-50 to-purple-100">
        <h2 className="text-4xl font-bold mb-4">
          Join the future of private location services
        </h2>
        <p className="text-lg mb-6">
          Whether you're a user or admin, EPLQ has the tools you need.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register">
            <Button className="text-md px-6 py-3">Register Now</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="text-md px-6 py-3">
              Login
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
