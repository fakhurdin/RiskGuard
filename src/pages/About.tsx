import { Shield, Target, Users, Lightbulb, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const mission = [
    {
      icon: Shield,
      title: "Security First",
      description: "Empowering organizations with robust cybersecurity frameworks and proactive risk management strategies."
    },
    {
      icon: Target,
      title: "Precision & Accuracy",
      description: "Delivering precise risk assessments and compliance monitoring through advanced analytics and AI."
    },
    {
      icon: Users,
      title: "Collaborative Excellence",
      description: "Fostering collaboration between security teams, stakeholders, and industry professionals."
    }
  ];

  const benefits = [
    "Comprehensive risk assessment and scoring",
    "Real-time compliance monitoring across multiple frameworks",
    "Collaborative platform for security teams",
    "AI-powered threat intelligence and recommendations",
    "Automated reporting and documentation",
    "Integration with existing security tools",
    "Industry-standard security practices",
    "24/7 monitoring and support"
  ];

  const useCases = [
    {
      title: "Enterprise Organizations",
      description: "Large corporations managing complex cybersecurity landscapes with multiple compliance requirements.",
      icon: Globe
    },
    {
      title: "Financial Services",
      description: "Banks and financial institutions requiring strict regulatory compliance and risk management.",
      icon: Award
    },
    {
      title: "Healthcare Providers",
      description: "Medical organizations protecting sensitive patient data and ensuring HIPAA compliance.",
      icon: Shield
    },
    {
      title: "Technology Companies",
      description: "Tech firms building secure products and maintaining customer trust through robust security practices.",
      icon: Lightbulb
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            About <span className="hero-gradient">RiskGuard</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A free, open cybersecurity GRC tool built to help everyone improve their security posture. Let's make the world more secure together!
          </p>
        </div>

        {/* Mission */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To provide free, accessible cybersecurity tools that help everyone build better security practices and create a safer digital world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mission.map((item, index) => (
              <Card key={index} className="card-glow hover:glow-effect transition-smooth animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold tracking-tight">
                About the Developer
              </h2>
              <p className="text-lg text-muted-foreground">
                Hi! I'm Fakhur Ul Din, a Cyber Security student passionate about making cybersecurity accessible to everyone through free, open tools.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Location:</strong> Karachi, Pakistan</p>
                <p><strong>Education:</strong> Bachelors in Cyber Security - FAST University</p>
                <p><strong>Mission:</strong> Building free tools to help secure our digital world</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-up">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-secondary/50 hover:bg-secondary/80 transition-smooth">
                  <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Who Can Use This Tool</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This free tool is designed for anyone interested in cybersecurity - students, professionals, small businesses, or anyone wanting to improve their security posture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="card-glow hover:glow-effect transition-smooth animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary flex-shrink-0">
                      <useCase.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground">{useCase.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section className="text-center py-16 bg-gradient-card rounded-2xl">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Vision & Values</h2>
            <p className="text-lg text-muted-foreground mb-8">
              "Security is not a product, but a process" - Bruce Schneier. This tool embodies that philosophy by providing free, accessible resources for continuous security improvement. Open for suggestions and collaboration!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-2">Free</div>
                <div className="text-sm text-muted-foreground">Always Free to Use</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">Open</div>
                <div className="text-sm text-muted-foreground">Source & Collaboration</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">Simple</div>
                <div className="text-sm text-muted-foreground">Yet Effective Tools</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}