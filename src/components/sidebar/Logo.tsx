import InstagramButton from "../button/InstagramBtn";

export default function Logo() {
    return (
        <div className="h-[90px] justify-center xl:justify-start flex-shrink-0 flex items-center cursor-pointer">
            <h1 className="font-display xl:block hidden text-2xl px-4">
                nextgram
            </h1>
            <InstagramButton />
        </div>
    );
}
