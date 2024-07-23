"use client";

import * as Dialog from "@radix-ui/react-dialog";
import useProjectModalStore from "@/stores/project-modal";
import useProjectData from "@/hooks/use-project-data";
import Image from "next/image";
import Markdown from "react-markdown";
import { X, LoaderCircle } from "lucide-react";

function Loader() {
  return (
    <div className="flex w-full items-center justify-center">
      <LoaderCircle className="size-12 animate-spin" />
    </div>
  );
}

export default function ProjectModal() {
  const { isOpen, projectId, setIsOpen } = useProjectModalStore();
  const { data: projectData, loading, error } = useProjectData(projectId);

  if (!projectId) {
    return null;
  }
  if (error)
    return <div className="text-red-500">Failed to load project data</div>;

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-65 backdrop-blur-[6px]" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[80%] w-full max-w-[85%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-auto rounded-[32px] bg-[#11141B] p-10 backdrop-blur-[6px] md:my-0 md:max-h-screen md:max-w-4xl">
          <Dialog.Close className="absolute right-5 top-5 text-white hover:opacity-70">
            <X />
          </Dialog.Close>
          {loading || !projectData ? (
            <>
              <Loader />
              <Dialog.Description />
            </>
          ) : (
            <div className="flex max-h-[inherit] w-full gap-10 overflow-y-auto">
              <Dialog.Description className="hidden" />
              <Image
                src={projectData?.profile?.image?.url}
                alt={projectData?.profile?.name}
                className="pointer-events-none size-[120px] rounded-full bg-gray-900 object-cover"
                width={120}
                height={120}
              />
              <div className="flex flex-col gap-2 text-[#ECEBE9]">
                <div className="flex flex-col gap-2">
                  <Dialog.Title className="text-[32px] font-bold">
                    {projectData?.profile?.name}
                  </Dialog.Title>
                  <p className="text-xs font-medium">
                    {projectData?.profile?.tagline}
                  </p>
                  <div className="flex items-center gap-2">
                    {Object.values(projectData?.profile?.tags).map(
                      (value, key) => (
                        <p
                          className="flex h-6 shrink-0 items-center justify-center gap-2 rounded-full bg-[#005253] px-2 py-1 text-xs font-medium text-[#abf8f3]"
                          key={key}
                        >
                          {value}
                        </p>
                      ),
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-base font-medium text-white">
                  <Markdown
                    components={{
                      img: ({ src, alt }) => {
                        return (
                          <Image
                            src={src as string}
                            alt={alt as string}
                            className="h-full max-h-56 w-full object-contain"
                            width={0}
                            height={0}
                          />
                        );
                      },
                    }}
                  >
                    {projectData?.profile?.description}
                  </Markdown>
                </div>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
