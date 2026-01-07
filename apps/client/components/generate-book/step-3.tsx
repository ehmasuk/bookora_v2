"use client";

import usePost from "@/hooks/usePost";
import { StoreType } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Step3Props {
  setStep: (step: 1 | 2) => void;
}

function Step3({ setStep }: Step3Props) {
  const router = useRouter();
  const { postData, loading: creatingBook } = usePost();
  const [creatingChapters, setCreatingChapters] = useState(false);
  const [creatingSections, setCreatingSections] = useState(false);

  const chapters = useStoreState<StoreType>((state) => state.generateBook.chapters);
  const sections = useStoreState<StoreType>((state) => state.generateBook.sections);
  const updateSection = useStoreActions<StoreType>((actions) => actions.generateBook.updateSection);
  const reset = useStoreActions<StoreType>((actions) => actions.generateBook.reset);

  const bookFormSchema = z.object({
    title: z.string().min(1, { message: "Book title is required" }),
  });

  const form = useForm<z.infer<typeof bookFormSchema>>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const handleSectionChange = (chapterIndex: number, sectionIndex: number, value: string) => {
    updateSection({ chapterIndex, sectionIndex, section: { title: value } });
  };

  function handleCreateBook(values: z.infer<typeof bookFormSchema>) {
    // Step 1: Create book
    postData<{ code: number; message: string; data: { id: string } }>({
      url: "/book",
      data: { title: values.title },
      onSuccess: (bookResponse) => {
        if (!bookResponse?.data?.id) {
          toast.error("Failed to create book");
          return;
        }

        const bookId = bookResponse.data.id;
        toast.success("Book created successfully!");

        // Step 2: Create chapters sequentially to maintain order
        setCreatingChapters(true);
        const chapterIds: string[] = [];
        let chapterIndex = 0;

        const createNextChapter = () => {
          if (chapterIndex >= chapters.length) {
            if (chapterIds.length !== chapters.length) {
              toast.error("Some chapters failed to create");
              setCreatingChapters(false);
              return;
            }

            toast.success("Chapters created successfully!");
            setCreatingChapters(false);

            // Step 3: Create sections
            setCreatingSections(true);
            const sectionPromises: Array<Promise<void>> = [];

            sections.forEach((chapterSections: Array<{ title: string; position: number }>, chIndex: number) => {
              if (chapterSections && chapterIds[chIndex]) {
                chapterSections.forEach((section: { title: string; position: number }, sectionIndex: number) => {
                  const promise = new Promise<void>((resolve) => {
                    postData({
                      url: "/section",
                      data: {
                        title: section.title,
                        chapterId: chapterIds[chIndex],
                        position: sectionIndex,
                      },
                      onSuccess: () => resolve(),
                      onError: () => resolve(), // Continue even if one fails
                    });
                  });
                  sectionPromises.push(promise);
                });
              }
            });

            Promise.all(sectionPromises).then(() => {
              toast.success("Sections created successfully!");
              setCreatingSections(false);

              // Reset store and navigate
              reset();
              router.push(`/book/${bookId}`);
            });
            return;
          }

          const chapter = chapters[chapterIndex];
          const currentIndex = chapterIndex;
          chapterIndex++;

          postData<{ code: number; message: string; data: { id: string } }>({
            url: "/chapter",
            data: {
              title: chapter.title,
              bookId: bookId,
              summary: chapter.summary,
              position: currentIndex,
            },
            onSuccess: (chapterResponse) => {
              if (chapterResponse?.data?.id) {
                chapterIds[currentIndex] = chapterResponse.data.id;
              }
              createNextChapter();
            },
            onError: () => {
              createNextChapter(); // Continue even if one fails
            },
          });
        };

        createNextChapter();
      },
      onError: (errMessage) => {
        toast.error(errMessage || "Failed to create book");
      },
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Review Sections & Create Book</h2>
        <p className="text-sm text-muted-foreground mb-4">Review sections for all chapters and provide a book title to create your book.</p>
      </div>

      {/* Book Title Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateBook)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter book title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {/* Sections Display */}
      <div className="space-y-6">
        {chapters.map((chapter: { title: string; summary: string; position: number }, chapterIndex: number) => (
          <div key={chapterIndex} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">{chapter.title}</h3>
              <span className="text-sm text-muted-foreground">({sections[chapterIndex]?.length || 0} sections)</span>
            </div>

            {sections[chapterIndex] && sections[chapterIndex].length > 0 ? (
              <div className="space-y-3">
                {sections[chapterIndex].map((section: { title: string; position: number }, sectionIndex: number) => (
                  <div key={sectionIndex} className="space-y-2">
                    <Label className="text-sm">Section {sectionIndex + 1}</Label>
                    <Input value={section.title} onChange={(e) => handleSectionChange(chapterIndex, sectionIndex, e.target.value)} placeholder="Section title" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No sections generated for this chapter.</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => setStep(2)}>
          Back
        </Button>
        <Button type="button" onClick={form.handleSubmit(handleCreateBook)} loading={creatingBook || creatingChapters || creatingSections}>
          Create Book
        </Button>
      </div>
    </div>
  );
}

export default Step3;
