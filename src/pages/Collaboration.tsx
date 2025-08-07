import { useState } from "react";
import { Users, MessageSquare, Lightbulb, TrendingUp, Clock, ThumbsUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface MitigationTip {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

interface ActivityItem {
  id: string;
  type: "tip" | "assessment" | "collaboration";
  content: string;
  author: string;
  timestamp: string;
}

export default function Collaboration() {
  const { toast } = useToast();
  const [tips, setTips] = useState<MitigationTip[]>([
    {
      id: "1",
      title: "Multi-Factor Authentication Best Practices",
      content: "Implement hardware-based MFA tokens for critical systems and use app-based authenticators for standard access. Avoid SMS-based 2FA due to SIM swapping vulnerabilities.",
      category: "Access Control",
      author: "Sarah Chen",
      timestamp: "2024-01-15 10:30",
      likes: 24,
      isLiked: false
    },
    {
      id: "2", 
      title: "Zero Trust Network Segmentation",
      content: "Implement micro-segmentation to isolate critical assets. Use software-defined perimeters and continuously verify user and device identity before granting access.",
      category: "Network Security",
      author: "Marcus Rodriguez",
      timestamp: "2024-01-14 15:45",
      likes: 18,
      isLiked: true
    },
    {
      id: "3",
      title: "Incident Response Playbook Updates",
      content: "Regularly update incident response procedures to include cloud-specific scenarios. Ensure playbooks address container security, serverless functions, and hybrid environments.",
      category: "Incident Response",
      author: "Emily Johnson",
      timestamp: "2024-01-13 09:15",
      likes: 31,
      isLiked: false
    }
  ]);

  const [activities] = useState<ActivityItem[]>([
    {
      id: "1",
      type: "tip",
      content: "Sarah shared a new mitigation tip about MFA best practices",
      author: "Sarah Chen",
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      type: "assessment",
      content: "Marcus completed a high-risk assessment for Network Security",
      author: "Marcus Rodriguez", 
      timestamp: "4 hours ago"
    },
    {
      id: "3",
      type: "collaboration",
      content: "Emily updated the Incident Response playbook",
      author: "Emily Johnson",
      timestamp: "6 hours ago"
    },
    {
      id: "4",
      type: "tip",
      content: "David shared insights on cloud security monitoring",
      author: "David Park",
      timestamp: "1 day ago"
    }
  ]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: ""
  });

  const categories = [
    "Access Control",
    "Network Security", 
    "Data Protection",
    "Incident Response",
    "Compliance",
    "Cloud Security",
    "Application Security"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.category) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newTip: MitigationTip = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      category: formData.category,
      author: "You",
      timestamp: new Date().toLocaleString(),
      likes: 0,
      isLiked: false
    };

    setTips([newTip, ...tips]);
    setFormData({ title: "", content: "", category: "" });

    toast({
      title: "Tip Shared Successfully",
      description: "Your mitigation tip has been shared with the community.",
    });
  };

  const handleLike = (tipId: string) => {
    setTips(tips.map(tip => 
      tip.id === tipId 
        ? { 
            ...tip, 
            likes: tip.isLiked ? tip.likes - 1 : tip.likes + 1,
            isLiked: !tip.isLiked 
          }
        : tip
    ));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "tip": return Lightbulb;
      case "assessment": return TrendingUp;
      case "collaboration": return Users;
      default: return MessageSquare;
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Security <span className="hero-gradient">Collaboration</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Share insights, best practices, and collaborate with cybersecurity professionals worldwide to strengthen our collective defense.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Share New Tip */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="card-glow animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share2 className="h-5 w-5" />
                  <span>Share Mitigation Tip</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tip Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Advanced Phishing Detection Techniques"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2 border border-input rounded-md bg-background"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Tip Content *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Share your security insights, best practices, or mitigation strategies..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full glow-effect">
                    Share Tip
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Mitigation Tips Feed */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Community Tips</h2>
              {tips.map((tip, index) => (
                <Card key={tip.id} className="card-glow hover:glow-effect transition-smooth animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg">{tip.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{tip.category}</Badge>
                            <span className="text-sm text-muted-foreground">by {tip.author}</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{tip.timestamp}</div>
                      </div>
                      
                      <p className="text-muted-foreground">{tip.content}</p>
                      
                      <div className="flex items-center justify-between pt-2 border-t border-border/40">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(tip.id)}
                          className={`transition-smooth ${tip.isLiked ? 'text-primary' : 'text-muted-foreground'}`}
                        >
                          <ThumbsUp className={`h-4 w-4 mr-1 ${tip.isLiked ? 'fill-current' : ''}`} />
                          {tip.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Discuss
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Activity Feed Sidebar */}
          <div className="space-y-6">
            <Card className="card-glow animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Live Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-smooth">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <IconComponent className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{activity.content}</p>
                          <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Community Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Members</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Tips Shared</span>
                    <span className="font-semibold">3,891</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">This Week</span>
                    <span className="font-semibold text-primary">+127</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Top Category</span>
                    <Badge variant="secondary">Network Security</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Contributors */}
            <Card className="card-glow">
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Sarah Chen", tips: 23, avatar: "SC" },
                    { name: "Marcus Rodriguez", tips: 19, avatar: "MR" },
                    { name: "Emily Johnson", tips: 16, avatar: "EJ" }
                  ].map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                          {contributor.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{contributor.name}</div>
                        <div className="text-xs text-muted-foreground">{contributor.tips} tips shared</div>
                      </div>
                      <Badge variant={index === 0 ? "default" : "secondary"}>
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}