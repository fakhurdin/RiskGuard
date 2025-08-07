import { Shield, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const resources = [
    { name: "NIST Cybersecurity Framework", href: "https://www.nist.gov/cyberframework" },
    { name: "ISO 27001 Guide", href: "https://www.iso.org/isoiec-27001-information-security.html" },
    { name: "SANS Institute", href: "https://www.sans.org/" },
    { name: "OWASP Top 10", href: "https://owasp.org/www-project-top-ten/" },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/fakhurdin", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/fakhurdin", icon: Linkedin },
    { name: "Email", href: "mailto:contact@riskguard.com", icon: Mail },
  ];

  return (
    <footer className="border-t border-border/40 bg-card/50 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">RiskGuard</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Advanced cybersecurity GRC toolkit for comprehensive risk management and compliance monitoring.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-smooth">About</Link></li>
              <li><Link to="/assessment" className="text-muted-foreground hover:text-foreground transition-smooth">Risk Assessment</Link></li>
              <li><Link to="/collaboration" className="text-muted-foreground hover:text-foreground transition-smooth">Collaboration</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-smooth">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-smooth flex items-center gap-1"
                  >
                    {resource.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-smooth"
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © 2024 RiskGuard. All rights reserved. Built for cybersecurity professionals.
            </p>
            <p className="text-xs text-muted-foreground mt-2 sm:mt-0">
              Empowering secure organizations through intelligent risk management.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}