import CloseToast from "@/components/global/CloseToast";
import { useEffect } from "react";
import { toast } from "sonner";


export function useFeedBackToast(state: any) {

  useEffect(() => {

    if (!state) {
      return
    }

    if (state.success === false) {
      toast.error(state.message || "Something went wrong", { action: <CloseToast /> })
    }

    if (state.success && state.message) {
      toast.success(state.message, { action: <CloseToast /> })
    }
  }, [state])

}