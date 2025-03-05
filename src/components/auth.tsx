"use client";

import React, { useEffect } from "react";
import { usePlaygroundState } from "@/hooks/use-playground-state";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ellipsisMiddle } from "@/lib/utils";
import { AuthBanner } from "./authBanner";
import { LockKeyhole } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const AuthFormSchema = z.object({
  openaiAPIKey: z.string().min(1, { message: "API key is required" }),
});


export function Auth() {
  const { pgState, dispatch, showAuthDialog, setShowAuthDialog } =
    usePlaygroundState();

    const FIXED_API_KEY = "dfss";

    useEffect(() => {
      // On page load, set the API key
      if (!pgState.openaiAPIKey) {
        dispatch({ type: "SET_API_KEY", payload: FIXED_API_KEY });
      }
    }, [dispatch, pgState.openaiAPIKey]);
  
  const onLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_API_KEY", payload: null });
    setShowAuthDialog(true);
  };

  return (
    <div>
      {pgState.openaiAPIKey && (
        <div className="text-xs flex gap-2 items-center">
          <span className="font-semibold text-neutral-700">
           We are Using OpenAI model
          </span>
          {/* <div className="py-1 px-2 rounded-md bg-neutral-200 text-neutral-600 ">
            {ellipsisMiddle(pgState.openaiAPIKey, 4, 4)}
          </div> */}
          {/* <a className="hover:underline cursor-pointer" onClick={onLogout}>
            Clear
          </a> */}
        </div>
      )}
      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onAuthComplete={() => setShowAuthDialog(false)}
      />
    </div>
  );
}

export function AuthDialog({
  open,
  onOpenChange,
  onAuthComplete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthComplete: () => void;
}) {
  const { pgState, dispatch } = usePlaygroundState();
  const form = useForm<z.infer<typeof AuthFormSchema>>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      openaiAPIKey: pgState.openaiAPIKey || "",
    },
  });

  // Add this useEffect hook to watch for changes in pgState.openaiAPIKey
  useEffect(() => {
    form.setValue("openaiAPIKey", pgState.openaiAPIKey || "");
  }, [pgState.openaiAPIKey, form]);

  function onSubmit(values: z.infer<typeof AuthFormSchema>) {
    dispatch({ type: "SET_API_KEY", payload: values.openaiAPIKey || null });
    onOpenChange(false);
    onAuthComplete();
  }

  return (
   <>
   </>
  );
}
