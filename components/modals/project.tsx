"use client";

import * as Dialog from "@radix-ui/react-dialog";
import useProjectModalStore from "@/stores/project-modal";
import useProjectData from "@/hooks/use-project-data";
import Image from "next/image";
import Markdown from "react-markdown";
import { X, LoaderCircle } from "lucide-react";
import Globe from "@/components/icons/globe";
import GitHub from "@/components/icons/github";
import Link from "next/link";
import TwitterX from "@/components/icons/twitter-x";
import Medium from "@/components/icons/medium";
import Discord from "@/components/icons/discord";
import Telegram from "@/components/icons/telegram";

function Loader() {
  return (
    <div className="flex w-full items-center justify-center">
      <LoaderCircle className="size-12 animate-spin" />
    </div>
  );
}

const MdImg = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <Image
      src={src}
      alt={alt}
      className="h-full max-h-56 w-full object-contain"
      width={0}
      height={0}
    />
  );
};

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((value, key) => (
        <p
          className="flex h-6 shrink-0 items-center justify-center gap-2 rounded-full bg-[#005253] px-2 py-1 text-xs font-medium text-[#abf8f3]"
          key={key}
        >
          {value}
        </p>
      ))}
    </div>
  );
};

const WebsiteLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center gap-1 rounded-full border border-[#80E9E5] p-1 text-xs font-bold text-[#80E9E5] transition-opacity duration-300 ease-in-out hover:opacity-50"
    >
      {children}
    </Link>
  );
};

const ProjectInfo = ({ projectData }: { projectData: any }) => {
  if (!projectData) return null;

  const { profile } = projectData;
  const { website, github, twitter, medium, discord, telegram } =
    profile?.linktree;
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto text-[#ECEBE9] md:gap-0">
      <Dialog.Description className="hidden" />
      <div className="flex gap-4">
        <Image
          src={profile?.image?.url}
          alt={profile?.name}
          className="pointer-events-none size-[80px] rounded-full bg-gray-900 object-cover md:size-[120px]"
          width={120}
          height={120}
        />
        <div className="flex flex-col gap-2">
          <Dialog.Title className="text-2xl font-medium md:text-[32px] md:font-bold">
            {profile?.name}
          </Dialog.Title>
          <p className="text-xs font-medium">{profile?.tagline}</p>
          <Tags tags={Object.values(profile?.tags)} />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:ml-[134px]">
        <div className="flex flex-wrap items-center gap-2">
          {website && (
            <WebsiteLink href={website}>
              <Globe /> Go to project
            </WebsiteLink>
          )}
          {github && (
            <WebsiteLink href={github}>
              <GitHub />
              Github
            </WebsiteLink>
          )}
        </div>
        <div className="flex flex-col gap-2 text-base font-medium text-white">
          <Markdown
            components={{
              img: ({ src, alt }) => {
                return <MdImg src={src as string} alt={alt as string} />;
              },
            }}
          >
            {profile?.description}
          </Markdown>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium">
            Connect with {profile?.name} on Social Media:
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {twitter && (
              <Link href={twitter}>
                <TwitterX />
              </Link>
            )}
            {medium && (
              <Link href={medium}>
                <Medium />
              </Link>
            )}
            {discord && (
              <Link href={discord}>
                <Discord />
              </Link>
            )}
            {telegram && (
              <Link href={telegram}>
                <Telegram />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[80%] min-h-[50%] w-full max-w-[85%] -translate-x-1/2 -translate-y-1/2 flex-col items-stretch justify-center overflow-auto rounded-[32px] bg-[#11141B] p-10 backdrop-blur-[6px] md:my-0 md:max-w-4xl">
          <Dialog.Close className="absolute right-5 top-5 text-white hover:opacity-70">
            <X />
          </Dialog.Close>
          {loading || !projectData ? (
            <>
              <Loader />
              <Dialog.Title className="hidden" />
              <Dialog.Description className="hidden" />
            </>
          ) : (
            <ProjectInfo projectData={projectData} />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
