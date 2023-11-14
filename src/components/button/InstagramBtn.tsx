"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaInstagram } from "react-icons/fa6";

export default function InstagramButton() {
    const router = useRouter();
    return (
        <Tooltip content="nextgram">
            <Button
                variant="light"
                onClick={() => router.push("/home")}
                className="xl:hidden flex"
                isIconOnly
            >
                <FaInstagram className="h-8 w-8" />
            </Button>
        </Tooltip>
    );
}
