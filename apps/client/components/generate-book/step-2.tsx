"use client";

import axiosInstance from "@/lib/axiosInstance";
import { StoreType } from "@/store/store";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useState } from "react";
import { toast } from "sonner";

interface Step2Props {
  setStep: (step: 1 | 3) => void;
}

export default function Step2({ setStep }: Step2Props) {
  const [loading, setLoading] = useState(false);
  const chapters = useStoreState<StoreType>((state) => state.generateBook.chapters);
  const updateChapter = useStoreActions<StoreType>((actions) => actions.generateBook.updateChapter);
  const setSections = useStoreActions<StoreType>((actions) => actions.generateBook.setSections);

  const handleChapterChange = (index: number, field: "title" | "summary", value: string) => {
    updateChapter({ index, chapter: { [field]: value } });
  };

  async function handleGenerateSections() {
    try {
      setLoading(true);
      const currentChapters = chapters.map((ch: { title: string; summary: string; position: number }) => ({
        title: ch.title,
        summary: ch.summary,
        position: ch.position,
      }));

      const response = await axiosInstance.post("/generate/section", currentChapters);
      const sectionsData = response.data?.data || [];

      // sectionsData is already a 2D array: Array<Array<{ title: string; position: number }>>
      setSections(sectionsData);
      toast.success("Sections generated successfully!");
      setStep(3);
    } catch (error: unknown) {
      let errorMessage = "Failed to generate sections";
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
      }
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Edit Chapters</h2>
        <p className="text-sm text-muted-foreground mb-4">Review and edit the generated chapters before generating sections.</p>
      </div>

      <div className="space-y-6">
        {chapters.map((chapter: { title: string; summary: string; position: number }, index: number) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-muted-foreground">Chapter {index + 1}</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`chapter-title-${index}`}>Title</Label>
              <Input
                id={`chapter-title-${index}`}
                value={chapter.title}
                onChange={(e) => handleChapterChange(index, "title", e.target.value)}
                placeholder="Chapter title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`chapter-summary-${index}`}>Summary</Label>
              <Textarea
                id={`chapter-summary-${index}`}
                value={chapter.summary}
                onChange={(e) => handleChapterChange(index, "summary", e.target.value)}
                placeholder="Chapter summary"
                rows={3}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button type="button" onClick={handleGenerateSections} loading={loading}>
          Generate Sections
        </Button>
      </div>
    </div>
  );
}

