"use client";

import { useUpdateSession } from "@/hooks/useUpdateSession";
import { TProfileDetail } from "@/lib/drizzle/queries/users/fetchUserProfileDetails";
import { cn, showToast } from "@/lib/utils";
import { Field, Label, Select } from "@headlessui/react";
import { useAction } from "next-safe-action/hooks";
import { usePathname } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { updateProfile } from "./action";
import InputText from "./InputText";
import Spinner from "@/components/Spinner";

type Props = {
  user: TProfileDetail;
  fullName: string;
};

const FormEditProfile = ({ user, fullName }: Props) => {
  const [state, setState] = useState({
    name: fullName,
    website: user?.website ?? "",
    occupation: user?.occupation ?? "",
    bio: user?.bio ?? "",
    gender: user?.gender ?? "",
  });

  const pathname = usePathname();

  const { execute, isPending, result, hasSucceeded } = useAction(
    updateProfile.bind(null, pathname),
    {
      async onSuccess({ data }) {
        if (data) {
          showToast("Update successful", "success");
        }
      },
    },
  );

  useUpdateSession(hasSucceeded, { name: result.data?.name });

  const bioError = result.validationErrors?.bio?._errors;
  const genderError = result.validationErrors?.gender?._errors;
  const nameError = result.validationErrors?.name?._errors;
  const occupationError = result.validationErrors?.occupation?._errors;
  const websiteError = result.validationErrors?.website?._errors;
  const actionError = result.serverError;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative mt-8 w-full space-y-6">
      <fieldset className="w-full" disabled={isPending}>
        <form className="flex flex-col gap-6" action={execute}>
          {actionError && (
            <p className="text-sm text-red-500">{actionError[0]}</p>
          )}
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="website" className="font-semibold">
              Website
            </label>
            <input
              id="website"
              type="text"
              placeholder="Website"
              name="website"
              onChange={handleChange}
              value={state.website}
              className="bg-bg-secondary w-full rounded-xl px-4 py-2 outline-0"
            />
            {websiteError && (
              <p className="text-xs text-red-400">{websiteError[0]}</p>
            )}
          </div>

          <InputText
            label="Full Name"
            onChange={handleChange}
            value={state.name}
            type="text"
            name="name"
            id="fullName"
            error={nameError && nameError[0]}
          />
          <InputText
            label="Occupation"
            onChange={handleChange}
            value={state.occupation}
            type="text"
            name="occupation"
            id="occupation"
            error={occupationError && occupationError[0]}
          />

          <div className="flex w-full flex-col gap-2">
            <label htmlFor="bio" className="font-semibold">
              Bio
            </label>
            <div className="border-foreground/20 relative w-full rounded-xl border py-2">
              <textarea
                name="bio"
                id="bio"
                value={state.bio}
                maxLength={150}
                onChange={(e) =>
                  setState({
                    ...state,
                    bio: e.target.value,
                  })
                }
                rows={2}
                className="w-full resize-none pr-14 pl-4 outline-0"
              ></textarea>

              <div className="absolute right-6 bottom-2 flex items-center">
                <p className="text-foreground/50 text-xs">
                  {state.bio.length}/150
                </p>
              </div>
            </div>
            {bioError && <p className="text-xs text-red-400">{bioError[0]}</p>}
          </div>

          <div className="w-full">
            <Field className="flex w-full flex-col gap-2 rounded-xl">
              <Label className="font-semibold">Gender</Label>
              <div className="relative">
                <Select
                  name="gender"
                  id="gender"
                  defaultValue={state.gender}
                  className={cn(
                    "bg-background border-foreground/20 block w-full appearance-none rounded-xl border px-4 py-2 outline-0",
                  )}
                >
                  <option value="">Please select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
                <div className="absolute top-1/2 right-2.5 -translate-y-1/2">
                  <ChevronDown />
                </div>
              </div>
              {genderError && (
                <p className="text-xs text-red-400">{genderError[0]}</p>
              )}
            </Field>
          </div>

          <div className="grid grid-cols-3">
            <div className="col-start-3">
              <button
                type="submit"
                className="disabled:bg-skin-primary/30 bg-skin-primary disabled:text-foreground/20 flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold"
              >
                {isPending ? <Spinner /> : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default FormEditProfile;

const ChevronDown = () => (
  <svg
    aria-label="Down chevron"
    fill="currentColor"
    height="12"
    role="img"
    viewBox="0 0 24 24"
    width="12"
    className="rotate-180"
  >
    <title>Down chevron</title>
    <path d="M21 17.502a.997.997 0 0 1-.707-.293L12 8.913l-8.293 8.296a1 1 0 1 1-1.414-1.414l9-9.004a1.03 1.03 0 0 1 1.414 0l9 9.004A1 1 0 0 1 21 17.502Z"></path>
  </svg>
);
