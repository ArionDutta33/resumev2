import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Download, Eye, Sparkles, Plus, Trash2 } from "lucide-react";

interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  education: Education[];
  experience: Experience[];
  skills: string[];
  summary: string;
}

interface ResumeBuilderProps {
  onBack: () => void;
}

// ResumePreview component with PDF-friendly styles
const ResumePreview = ({
  data,
  template,
}: {
  data: ResumeData;
  template: string;
}) => {
  const getTemplateStyles = () => {
    switch (template) {
      case "modern":
        return {
          container: "bg-white p-8 shadow-lg rounded-none font-sans",
          header: "border-b-2 border-blue-600 pb-4 mb-6",
          name: "text-3xl font-bold text-gray-900 mb-2",
          contact: "text-gray-600 text-sm",
          section: "mb-6",
          sectionTitle:
            "text-lg font-semibold text-blue-600 mb-3 border-b border-blue-200 pb-1",
          itemTitle: "font-semibold text-gray-900",
          itemSubtitle: "text-gray-600 text-sm",
          description: "text-gray-700 text-sm mt-2",
        };
      case "creative":
        return {
          container: "bg-white p-8 shadow-lg rounded-none font-sans",
          header: "bg-purple-100 -m-8 p-8 mb-6",
          name: "text-3xl font-bold text-purple-800 mb-2",
          contact: "text-purple-600 text-sm",
          section: "mb-6",
          sectionTitle:
            "text-lg font-semibold text-purple-600 mb-3 border-l-4 border-purple-400 pl-3",
          itemTitle: "font-semibold text-gray-900",
          itemSubtitle: "text-gray-600 text-sm",
          description: "text-gray-700 text-sm mt-2",
        };
      case "executive":
        return {
          container: "bg-white p-8 shadow-lg rounded-none font-serif",
          header: "text-center border-b border-gray-300 pb-4 mb-6",
          name: "text-3xl font-bold text-gray-900 mb-2",
          contact: "text-gray-600 text-sm",
          section: "mb-6",
          sectionTitle:
            "text-lg font-semibold text-gray-900 mb-3 text-center uppercase tracking-wide",
          itemTitle: "font-semibold text-gray-900",
          itemSubtitle: "text-gray-600 text-sm",
          description: "text-gray-700 text-sm mt-2",
        };
      default:
        return {
          container: "bg-white p-8 shadow-lg rounded-none font-sans",
          header: "border-b-2 border-blue-600 pb-4 mb-6",
          name: "text-3xl font-bold text-gray-900 mb-2",
          contact: "text-gray-600 text-sm",
          section: "mb-6",
          sectionTitle:
            "text-lg font-semibold text-blue-600 mb-3 border-b border-blue-200 pb-1",
          itemTitle: "font-semibold text-gray-900",
          itemSubtitle: "text-gray-600 text-sm",
          description: "text-gray-700 text-sm mt-2",
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.name}>{data.personalInfo.name || "Your Name"}</h1>
        <div className={styles.contact}>
          <p>
            {data.personalInfo.email} • {data.personalInfo.phone}
          </p>
          <p>{data.personalInfo.address}</p>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Professional Summary</h2>
          <p className={styles.description}>{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.some((exp) => exp.company || exp.position) && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className={styles.itemTitle}>
                  {exp.position || "Position"}
                </h3>
                <span className={styles.itemSubtitle}>{exp.duration}</span>
              </div>
              <p className={styles.itemSubtitle}>{exp.company}</p>
              {exp.description && (
                <p className={styles.description}>{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.some((edu) => edu.school || edu.degree) && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className={styles.itemTitle}>{edu.degree || "Degree"}</h3>
                <span className={styles.itemSubtitle}>{edu.year}</span>
              </div>
              <p className={styles.itemSubtitle}>{edu.school}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.some((skill) => skill.trim()) && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills
              .filter((skill) => skill.trim())
              .map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ onBack }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    education: [{ id: "1", school: "", degree: "", year: "" }],
    experience: [
      { id: "1", company: "", position: "", duration: "", description: "" },
    ],
    skills: [""],
    summary: "",
  });

  const generateAISummary = async () => {
    try {
      const userInfo = {
        name: resumeData.personalInfo.name,
        experience: resumeData.experience.filter(
          (exp) => exp.company && exp.position
        ),
        education: resumeData.education.filter(
          (edu) => edu.school && edu.degree
        ),
        skills: resumeData.skills.filter((skill) => skill.trim()),
      };

      const describe = `
        Professional with experience in: ${userInfo.experience
          .map((exp) => `${exp.position} at ${exp.company}`)
          .join(", ")}.
        Education: ${userInfo.education
          .map((edu) => `${edu.degree} from ${edu.school}`)
          .join(", ")}.
        Skills: ${userInfo.skills.join(", ")}.
        ${resumeData.summary ? `Current summary: ${resumeData.summary}` : ""}
      `.trim();

      alert("Generating AI summary...");

      const response = await fetch(
        "https://5736955a-4256-49d5-8849-e7233097d0e9.us-east-1.cloud.genez.io/response",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ describe }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.summary) {
        setResumeData((prev) => ({ ...prev, summary: data.summary }));
        alert("AI summary generated successfully!");
      } else {
        throw new Error("No summary received from API");
      }
    } catch (error) {
      console.error("Error generating AI summary:", error);

      const aiSummaries = [
        "Dynamic and results-driven professional with proven expertise in driving organizational success through innovative solutions and strategic leadership. Committed to excellence and continuous improvement.",
        "Experienced professional with a strong track record of delivering high-quality results in fast-paced environments. Skilled in collaboration, problem-solving, and driving projects to successful completion.",
        "Detail-oriented and motivated professional with excellent communication skills and a passion for achieving outstanding results. Proven ability to adapt to new challenges and deliver value to organizations.",
      ];

      const randomSummary =
        aiSummaries[Math.floor(Math.random() * aiSummaries.length)];
      setResumeData((prev) => ({ ...prev, summary: randomSummary }));

      alert("Failed to connect to AI service. Using fallback summary.");
    }
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { id: Date.now().toString(), school: "", degree: "", year: "" },
      ],
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          duration: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addSkill = () => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const removeSkill = (index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    alert("Resume saved!");
  };

  const handleGeneratePDF = async () => {
    try {
      alert("Generating PDF...");

      // Create a temporary container with the resume content
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "-9999px";
      tempContainer.style.width = "210mm"; // A4 width
      tempContainer.style.minHeight = "297mm"; // A4 height
      tempContainer.style.backgroundColor = "white";
      tempContainer.style.fontFamily = "Arial, sans-serif";

      // Get the resume content and clone it
      const resumeElement = document.getElementById("resume-preview");
      if (!resumeElement) {
        alert("Resume preview not found.");
        return;
      }

      // Clone the resume content
      const clonedResume = resumeElement.cloneNode(true) as HTMLElement;

      // Remove any problematic styles that might contain oklch
      const allElements = clonedResume.querySelectorAll("*");
      allElements.forEach((el) => {
        const element = el as HTMLElement;
        // Remove any computed styles that might contain oklch
        element.style.removeProperty("color");
        element.style.removeProperty("background-color");
        element.style.removeProperty("border-color");

        // Apply safe colors
        if (element.classList.contains("text-blue-600")) {
          element.style.color = "#2563eb";
        }
        if (element.classList.contains("text-purple-600")) {
          element.style.color = "#9333ea";
        }
        if (element.classList.contains("text-gray-900")) {
          element.style.color = "#111827";
        }
        if (element.classList.contains("text-gray-600")) {
          element.style.color = "#4b5563";
        }
        if (element.classList.contains("text-gray-700")) {
          element.style.color = "#374151";
        }
        if (element.classList.contains("border-blue-600")) {
          element.style.borderColor = "#2563eb";
        }
        if (element.classList.contains("border-blue-200")) {
          element.style.borderColor = "#bfdbfe";
        }
        if (element.classList.contains("bg-purple-100")) {
          element.style.backgroundColor = "#f3e8ff";
        }
        if (element.classList.contains("bg-gray-100")) {
          element.style.backgroundColor = "#f3f4f6";
        }
      });

      tempContainer.appendChild(clonedResume);
      document.body.appendChild(tempContainer);

      // Use html2canvas with better options
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        removeContainer: true,
        ignoreElements: (element) => {
          // Ignore elements that might have problematic styles
          const computedStyle = window.getComputedStyle(element);
          return (
            computedStyle.color.includes("oklch") ||
            computedStyle.backgroundColor.includes("oklch") ||
            computedStyle.borderColor.includes("oklch")
          );
        },
      });

      // Remove temporary container
      document.body.removeChild(tempContainer);

      // Generate PDF
      const jsPDF = (await import("jspdf")).default;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.personalInfo.name || "resume"}.pdf`);

      alert("Resume downloaded successfully!");
    } catch (error) {
      console.error("PDF generation failed", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleSave}>
              Save Resume
            </Button>
            <Button
              onClick={handleGeneratePDF}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Generate PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Template Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Template Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedTemplate}
                  onValueChange={setSelectedTemplate}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern Professional</SelectItem>
                    <SelectItem value="creative">Creative Designer</SelectItem>
                    <SelectItem value="executive">Executive Classic</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={resumeData.personalInfo.name}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            name: e.target.value,
                          },
                        }))
                      }
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            email: e.target.value,
                          },
                        }))
                      }
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            phone: e.target.value,
                          },
                        }))
                      }
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={resumeData.personalInfo.address}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            address: e.target.value,
                          },
                        }))
                      }
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Professional Summary
                  <Button
                    onClick={generateAISummary}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Generate
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={resumeData.summary}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      summary: e.target.value,
                    }))
                  }
                  placeholder="Write a compelling summary or use AI to generate one..."
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Education
                  <Button onClick={addEducation} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm text-gray-600">
                        Education {index + 1}
                      </h4>
                      {resumeData.education.length > 1 && (
                        <Button
                          onClick={() => removeEducation(edu.id)}
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input
                        placeholder="School/University"
                        value={edu.school}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            education: prev.education.map((item) =>
                              item.id === edu.id
                                ? { ...item, school: e.target.value }
                                : item
                            ),
                          }))
                        }
                      />
                      <Input
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            education: prev.education.map((item) =>
                              item.id === edu.id
                                ? { ...item, degree: e.target.value }
                                : item
                            ),
                          }))
                        }
                      />
                    </div>
                    <Input
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          education: prev.education.map((item) =>
                            item.id === edu.id
                              ? { ...item, year: e.target.value }
                              : item
                          ),
                        }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Work Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Work Experience
                  <Button onClick={addExperience} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm text-gray-600">
                        Experience {index + 1}
                      </h4>
                      {resumeData.experience.length > 1 && (
                        <Button
                          onClick={() => removeExperience(exp.id)}
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            experience: prev.experience.map((item) =>
                              item.id === exp.id
                                ? { ...item, company: e.target.value }
                                : item
                            ),
                          }))
                        }
                      />
                      <Input
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) =>
                          setResumeData((prev) => ({
                            ...prev,
                            experience: prev.experience.map((item) =>
                              item.id === exp.id
                                ? { ...item, position: e.target.value }
                                : item
                            ),
                          }))
                        }
                      />
                    </div>
                    <Input
                      placeholder="Duration (e.g., 2020-2023)"
                      value={exp.duration}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          experience: prev.experience.map((item) =>
                            item.id === exp.id
                              ? { ...item, duration: e.target.value }
                              : item
                          ),
                        }))
                      }
                    />
                    <Textarea
                      placeholder="Job description and achievements..."
                      value={exp.description}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          experience: prev.experience.map((item) =>
                            item.id === exp.id
                              ? { ...item, description: e.target.value }
                              : item
                          ),
                        }))
                      }
                      rows={3}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Skills
                  <Button onClick={addSkill} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="Enter a skill"
                      value={skill}
                      onChange={(e) =>
                        setResumeData((prev) => ({
                          ...prev,
                          skills: prev.skills.map((s, i) =>
                            i === index ? e.target.value : s
                          ),
                        }))
                      }
                    />
                    {resumeData.skills.length > 1 && (
                      <Button
                        onClick={() => removeSkill(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 lg:h-fit" id="resume-preview">
            <ResumePreview data={resumeData} template={selectedTemplate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
