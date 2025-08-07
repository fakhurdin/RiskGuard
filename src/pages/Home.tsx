import { ArrowRight, Shield, BarChart3, Users, Lock, CheckCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroCyber from "@/assets/hero-cyber.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Comprehensive risk evaluation with automated scoring and mitigation recommendations.",
    },
    {
      icon: BarChart3,
      title: "Compliance Monitoring",
      description: "Track regulatory compliance across multiple frameworks like ISO 27001, NIST, and more.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share insights, best practices, and coordinate security efforts across your organization.",
    },
    {
      icon: Lock,
      title: "Governance Framework",
      description: "Establish robust governance structures for sustainable cybersecurity management.",
    },
  ];

  const stats = [
    { value: "Free", label: "Always Free Tool" },
    { value: "GRC", label: "Focused Framework" },
    { value: "Open", label: "Source Available" },
    { value: "NIST", label: "Standard Based" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background to-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Secure Your Digital
                  <span className="hero-gradient block">Future</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Free cybersecurity GRC tool helping anyone assess risks and improve security posture. Open for collaboration - let's make the world more secure!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/assessment">
                  <Button size="lg" className="glow-effect group">
                    Start Risk Assessment
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="transition-smooth">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
              <img
                src={heroCyber}
                alt="Cybersecurity Dashboard"
                className="relative z-10 rounded-2xl shadow-2xl w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Comprehensive GRC Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Free tools to help you build better cybersecurity governance, risk, and compliance practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-glow hover:glow-effect transition-smooth animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Preview */}
      <section className="py-20 lg:py-32 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                AI-Powered Security Intelligence
              </h2>
              <p className="text-lg text-muted-foreground">
                Simple, effective risk assessment tools based on industry standards like NIST. Free to use, open for collaboration.
              </p>
              
              <div className="space-y-4">
                {[
                  "NIST-based risk assessment framework",
                  "Simple and effective evaluation tools",
                  "Open source and free to use",
                  "Community-driven improvements"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/assessment">
                <Button className="glow-effect group">
                  Try Assessment Tool
                  <TrendingUp className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="relative animate-slide-up">
              <img
                src={dashboardPreview}
                alt="Dashboard Preview"
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              "The best way to predict the future is to create it" - Peter Drucker
            </h2>
            <p className="text-xl text-muted-foreground">
              Start your cybersecurity journey today. This tool is completely free and open for everyone. More features coming soon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/assessment">
                <Button size="lg" className="glow-effect">
                  Start Free Assessment
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Get Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}