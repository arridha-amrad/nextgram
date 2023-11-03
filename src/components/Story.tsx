"use client";

import { Ref, forwardRef } from "react";
import Image from "next/image";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

type Props = {
  url: string;
};

const Story = ({ url }: Props, ref: Ref<HTMLDivElement>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };
  return (
    <>
      <div
        onClick={handleOpen}
        ref={ref}
        className="bg-gradient-to-tr cursor-pointer flex-shrink-0 from-yellow-500 to-purple-500 via-red-500 rounded-full p-0.5"
      >
        <div className="bg-background p-1 rounded-full">
          <Image
            width={60}
            height={60}
            alt="story"
            className="rounded-full w-12 sm:w-14 md:w-16 aspect-square"
            src={url}
          />
        </div>
      </div>
      <Modal
        classNames={{
          closeButton: ["fixed", "right-5", "top-5"],
          base: ["h-[95%]"],
        }}
        backdrop="blur"
        size="md"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default forwardRef(Story);
