import { useState } from "react";
import { AlertTriangle, CheckCircle, Shield, BarChart3, FileText, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  category: string;
  question: string;
  framework: string;
  options: {
    text: string;
    score: number;
    risk: "Low" | "Medium" | "High" | "Critical";
  }[];
}

interface Assessment {
  id: string;
  timestamp: string;
  totalScore: number;
  maxScore: number;
  overallRisk: "Low" | "Medium" | "High" | "Critical";
  categoryScores: { [key: string]: { score: number; maxScore: number } };
}

const nistQuestions: Question[] = [
  {
    id: "identify-1",
    category: "Identify",
    framework: "NIST CSF",
    question: "How well does your organization maintain an inventory of authorized and unauthorized devices?",
    options: [
      { text: "Complete automated inventory with real-time monitoring", score: 4, risk: "Low" },
      { text: "Manual inventory updated regularly (monthly)", score: 3, risk: "Medium" },
      { text: "Basic inventory, updated irregularly", score: 2, risk: "High" },
      { text: "No formal inventory process", score: 1, risk: "Critical" }
    ]
  },
  {
    id: "identify-2",
    category: "Identify",
    framework: "NIST CSF",
    question: "How comprehensive is your data classification and handling policy?",
    options: [
      { text: "Comprehensive policy with regular training and enforcement", score: 4, risk: "Low" },
      { text: "Policy exists with some training", score: 3, risk: "Medium" },
      { text: "Basic policy, minimal training", score: 2, risk: "High" },
      { text: "No formal data classification policy", score: 1, risk: "Critical" }
    ]
  },
  {
    id: "protect-1",
    category: "Protect",
    framework: "NIST CSF",
    question: "What is the current state of your access control implementation?",
    options: [
      { text: "Multi-factor authentication with role-based access and regular reviews", score: 4, risk: "Low" },
      { text: "MFA implemented, basic role-based access", score: 3, risk: "Medium" },
      { text: "Basic access controls, no MFA", score: 2, risk: "High" },
      { text: "Minimal access controls", score: 1, risk: "Critical" }
    ]
  },
  {
    id: "protect-2",
    category: "Protect",
    framework: "NIST CSF",
    question: "How robust is your security awareness training program?",
    options: [
      { text: "Regular training with simulated phishing and metrics tracking", score: 4, risk: "Low" },
      { text: "Annual training with some practical exercises", score: 3, risk: "Medium" },
      { text: "Basic annual training only", score: 2, risk: "High" },
      { text: "No formal security awareness training", score: 1, risk: "Critical" }
    ]
  },
  {
    id: "detect-1",
    category: "Detect",
    framework: "NIST CSF",
    question: "What level of continuous monitoring do you have in place?",
    options: [
      { text: "24/7 SOC with SIEM and automated threat detection", score: 4, risk: "Low" },
      { text: "SIEM with business hours monitoring", score: 3, risk: "Medium" },
      { text: "Basic log monitoring", score: 2, risk: "High" },
      { text: "No systematic monitoring", score: 1, risk: "Critical" }
    ]
  },
  {
    id: "respond-1",
    category: "Respond",
    framework: "NIST CSF",
    question: "How mature is your incident response capability?",
    options: [
      { text: "Tested incident response plan with dedicated team and automation", score: 4, risk: "Low" },
      { text: "Documented plan with assigned roles, tested annually", score: 3, risk: "Medium" },
      { text: "Basic incident response plan exists", score: 2, risk: "High" },
      { text: "No formal incident response plan", score: 1, risk: "Critical" }
    ]
  },
  {
    id: "recover-1",
    category: "Recover",
    framework: "NIST CSF",
    question: "What is the status of your backup and recovery procedures?",
    options: [
      { text: "Automated backups with tested disaster recovery and RTO/RPO defined", score: 4, risk: "Low" },
      { text: "Regular backups with documented recovery procedures", score: 3, risk: "Medium" },
      { text: "Basic backup system", score: 2, risk: "High" },
      { text: "No systematic backup strategy", score: 1, risk: "Critical" }
    ]
  },
  {
    id: "governance-1",
    category: "Governance",
    framework: "ISO 27001",
    question: "How established is your information security governance structure?",
    options: [
      { text: "CISO with dedicated security team and board oversight", score: 4, risk: "Low" },
      { text: "Security officer with defined responsibilities", score: 3, risk: "Medium" },
      { text: "Part-time security responsibilities assigned", score: 2, risk: "High" },
      { text: "No dedicated security governance", score: 1, risk: "Critical" }
    ]
  },
  {
    id: "risk-1",
    category: "Risk Management",
    framework: "ISO 27001",
    question: "How comprehensive is your risk assessment process?",
    options: [
      { text: "Regular risk assessments with quantitative analysis and treatment plans", score: 4, risk: "Low" },
      { text: "Annual risk assessments with documented treatment", score: 3, risk: "Medium" },
      { text: "Basic risk assessment performed", score: 2, risk: "High" },
      { text: "No formal risk assessment process", score: 1, risk: "Critical" }
    ]
  },
  {
    id: "compliance-1",
    category: "Compliance",
    framework: "Regulatory",
    question: "How well do you manage regulatory compliance requirements?",
    options: [
      { text: "Automated compliance monitoring with regular audits", score: 4, risk: "Low" },
      { text: "Regular compliance reviews and documentation", score: 3, risk: "Medium" },
      { text: "Basic compliance tracking", score: 2, risk: "High" },
      { text: "No systematic compliance management", score: 1, risk: "Critical" }
    ]
  }
];

export default function Assessment() {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (questionId: string, score: number) => {
    setAnswers({ ...answers, [questionId]: score });
    
    if (currentQuestion < nistQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeAssessment();
    }
  };

  const completeAssessment = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = nistQuestions.length * 4;
    const percentage = (totalScore / maxScore) * 100;
    
    let overallRisk: "Low" | "Medium" | "High" | "Critical";
    if (percentage >= 80) overallRisk = "Low";
    else if (percentage >= 60) overallRisk = "Medium";
    else if (percentage >= 40) overallRisk = "High";
    else overallRisk = "Critical";

    // Calculate category scores
    const categoryScores: { [key: string]: { score: number; maxScore: number } } = {};
    nistQuestions.forEach((q) => {
      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { score: 0, maxScore: 0 };
      }
      categoryScores[q.category].score += answers[q.id] || 0;
      categoryScores[q.category].maxScore += 4;
    });

    const newAssessment: Assessment = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      totalScore,
      maxScore,
      overallRisk,
      categoryScores
    };

    setAssessments([newAssessment, ...assessments]);
    setIsCompleted(true);
    setShowResults(true);

    toast({
      title: "Assessment Completed!",
      description: `Overall Risk Level: ${overallRisk} (${Math.round(percentage)}%)`,
    });
  };

  const restartAssessment = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setIsCompleted(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30";
      case "Medium": return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
      case "High": return "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30";
      case "Critical": return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30";
      default: return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30";
    }
  };

  const currentQ = nistQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / nistQuestions.length) * 100;

  if (showResults && isCompleted) {
    const latestAssessment = assessments[0];
    const percentage = Math.round((latestAssessment.totalScore / latestAssessment.maxScore) * 100);

    return (
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Assessment <span className="hero-gradient">Results</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your cybersecurity maturity assessment based on NIST and ISO 27001 frameworks.
            </p>
          </div>

          {/* Overall Results */}
          <Card className="card-glow mb-8 animate-fade-in">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="text-6xl font-bold text-primary mr-4">{percentage}%</div>
                <Badge className={`text-lg px-4 py-2 ${getRiskColor(latestAssessment.overallRisk)}`}>
                  {latestAssessment.overallRisk} Risk
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                You scored {latestAssessment.totalScore} out of {latestAssessment.maxScore} points
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={restartAssessment} className="glow-effect">
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Retake Assessment
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card className="card-glow mb-8 animate-slide-up">
            <CardHeader>
              <CardTitle>Category Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(latestAssessment.categoryScores).map(([category, scores]) => {
                  const categoryPercentage = Math.round((scores.score / scores.maxScore) * 100);
                  let categoryRisk: "Low" | "Medium" | "High" | "Critical";
                  if (categoryPercentage >= 80) categoryRisk = "Low";
                  else if (categoryPercentage >= 60) categoryRisk = "Medium";
                  else if (categoryPercentage >= 40) categoryRisk = "High";
                  else categoryRisk = "Critical";

                  return (
                    <div key={category} className="p-4 border border-border rounded-lg">
                      <h4 className="font-medium mb-2">{category}</h4>
                      <div className="text-2xl font-bold mb-1">{categoryPercentage}%</div>
                      <Badge className={getRiskColor(categoryRisk)} variant="outline">
                        {categoryRisk}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Assessment History */}
          {assessments.length > 1 && (
            <Card className="card-glow animate-slide-up">
              <CardHeader>
                <CardTitle>Assessment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessments.slice(1).map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <div className="font-medium">{assessment.timestamp}</div>
                        <div className="text-sm text-muted-foreground">
                          {Math.round((assessment.totalScore / assessment.maxScore) * 100)}% overall score
                        </div>
                      </div>
                      <Badge className={getRiskColor(assessment.overallRisk)}>
                        {assessment.overallRisk}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            Cybersecurity <span className="hero-gradient">Assessment</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Evaluate your organization's cybersecurity maturity based on NIST Cybersecurity Framework and ISO 27001 standards.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} of {nistQuestions.length}
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <Card className="card-glow max-w-4xl mx-auto animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">{currentQ.framework}</Badge>
              <Badge className="bg-primary/10 text-primary">{currentQ.category}</Badge>
            </div>
            <CardTitle className="text-xl">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(currentQ.id, option.score)}
                  className="w-full p-4 text-left border border-border rounded-lg hover:bg-secondary/50 transition-smooth group"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex-1">{option.text}</span>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRiskColor(option.risk)} variant="outline">
                        {option.risk}
                      </Badge>
                      <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <div className="mt-6 pt-6 border-t border-border">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestion(currentQuestion - 1)}
                >
                  Previous Question
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-glow text-center animate-fade-in">
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">NIST Framework</h3>
              <p className="text-sm text-muted-foreground">
                Based on the NIST Cybersecurity Framework core functions
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-glow text-center animate-fade-in">
            <CardContent className="p-6">
              <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Risk Scoring</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive scoring across all security domains
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-glow text-center animate-fade-in">
            <CardContent className="p-6">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Free Tool</h3>
              <p className="text-sm text-muted-foreground">
                No cost, no registration required - just secure knowledge
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}