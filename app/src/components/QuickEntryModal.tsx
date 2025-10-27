import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import clsx from "classnames";
import { apiClient } from "../lib/api";
import { useDebounce } from "../hooks/useDebounce";

const quickEntrySchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(18, "Usernames can be at most 18 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Use only letters, numbers, and underscores. No spaces."
    ),
  gender: z.enum(["female", "male", "non-binary", "prefer_not_to_say"]),
});

type QuickEntrySchema = z.infer<typeof quickEntrySchema>;

type UsernameCheckResponse = {
  available: boolean;
  suggestions: string[];
  message?: string;
};

type QuickEntryModalProps = {
  open: boolean;
  onClose: () => void;
};

const usernameSchema = quickEntrySchema.shape.username;

export function QuickEntryModal({ open, onClose }: QuickEntryModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastQueriedUsername, setLastQueriedUsername] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuickEntrySchema>({
    resolver: zodResolver(quickEntrySchema),
    defaultValues: {
      username: "",
      gender: "prefer_not_to_say",
    },
  });

  const usernameValue = watch("username");
  const selectedGender = watch("gender");
  const debouncedUsername = useDebounce(usernameValue.trim().toLowerCase(), 500);

  const {
    mutateAsync: checkUsername,
    data: lastCheck,
    isPending: isChecking,
    reset: resetCheck,
  } = useMutation({
    mutationKey: ["username-check"],
    mutationFn: async (username: string) => {
      const response = await apiClient.post<UsernameCheckResponse>(
        "/api/username/check",
        {
          username,
        }
      );
      return response.data;
    },
    retry: 1,
    onSuccess: () => {
      setErrorMessage(null);
    },
    onError: () => {
      setErrorMessage(
        "We hit a snag checking that username. Please try again in a moment."
      );
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
      resetCheck();
      setIsSubmitted(false);
      setErrorMessage(null);
      setLastQueriedUsername("");
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, reset, resetCheck]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const trimmed = debouncedUsername.trim();
    if (!trimmed || trimmed === lastQueriedUsername) {
      return;
    }

    const result = usernameSchema.safeParse(trimmed);
    if (!result.success) {
      return;
    }

    setLastQueriedUsername(trimmed);

    checkUsername(trimmed).catch(() => {
      // handled in onError
    });
  }, [debouncedUsername, checkUsername, lastQueriedUsername, open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const suggestions = useMemo(() => {
    if (!lastCheck?.suggestions?.length) {
      return [];
    }
    return lastCheck.suggestions;
  }, [lastCheck]);

  if (!open) {
    return null;
  }

  const availability = lastCheck?.available;

  const onSubmit = async (values: QuickEntrySchema) => {
    const normalized = values.username.trim().toLowerCase();
    const validation = usernameSchema.safeParse(normalized);
    if (!validation.success) {
      return;
    }

    const result = await checkUsername(normalized).catch(() => undefined);

    if (result?.available) {
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 1200);
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0"
        onClick={() => {
          onClose();
        }}
      />
      <div className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-800/80 bg-slate-950/90 p-8 shadow-2xl shadow-black/60">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-400">
              Quick entry
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Claim your anonymous handle
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Pick something memorable. Usernames stay unique for 24 hours.
            </p>
          </div>
          <button
            className="rounded-full border border-slate-700 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300 transition hover:border-slate-500 hover:text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <form
          className="mt-6 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-200"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                id="username"
                className={clsx(
                  "w-full rounded-xl border bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition",
                  errors.username
                    ? "border-rose-500/60 focus:border-rose-400 focus:ring-rose-400/50"
                    : "border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                )}
                placeholder="e.g. starbound_aria"
                autoComplete="off"
                {...register("username")}
              />
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-base">
                {isChecking && (
                  <span className="h-2.5 w-2.5 animate-ping rounded-full bg-indigo-400" />
                )}
                {!isChecking && availability !== undefined && (
                  <span
                    className={clsx(
                      "h-2.5 w-2.5 rounded-full",
                      availability ? "bg-emerald-400" : "bg-rose-500"
                    )}
                  />
                )}
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Keep it between 3-18 characters. Letters, numbers, and underscores
              only.
            </p>
            {errors.username?.message && (
              <p className="text-xs font-medium text-rose-400">
                {errors.username.message}
              </p>
            )}
            {!errors.username?.message && availability === false && (
              <p className="text-xs font-medium text-rose-400">
                {lastCheck?.message ?? "That username is already taken."}
              </p>
            )}
            {!errors.username?.message &&
              availability &&
              !!usernameValue.trim() && (
                <p className="text-xs font-medium text-emerald-400">
                  Nice pick! This username is available.
                </p>
              )}
          </div>

          {suggestions.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Try one of these instead
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-indigo-500 hover:text-white"
                    onClick={() => setValue("username", option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-200"
              htmlFor="gender"
            >
              Gender
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { value: "female", label: "Female" },
                { value: "male", label: "Male" },
                { value: "non-binary", label: "Non-binary" },
                { value: "prefer_not_to_say", label: "Prefer not to say" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={clsx(
                    "cursor-pointer rounded-xl border px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide transition",
                    selectedGender === option.value
                      ? "border-indigo-500/70 bg-indigo-500/10 text-white"
                      : "border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500"
                  )}
                >
                  <input
                    type="radio"
                    value={option.value}
                    className="hidden"
                    {...register("gender")}
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {errors.gender?.message && (
              <p className="text-xs font-medium text-rose-400">
                {errors.gender.message}
              </p>
            )}
          </div>

          {errorMessage && (
            <p className="text-xs font-medium text-amber-400">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:shadow-lg hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={
              isSubmitting ||
              isChecking ||
              availability === false ||
              !!errorMessage
            }
          >
            {isSubmitting ? "Launching…" : "Enter the chat"}
          </button>

          {isSubmitted && (
            <p className="text-center text-sm font-semibold text-emerald-400">
              You&apos;re in! Matching you with someone new…
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
