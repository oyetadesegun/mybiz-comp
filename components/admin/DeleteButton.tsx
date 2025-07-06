"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import deleteUser from "@/actions/user/user.actions";

interface DeleteButtonProps {
  id: string;
  type: string;
  children?: React.ReactNode; // Add children to the props interface
}

export default function DeleteButton({ id,type, children }: DeleteButtonProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);



  return (
    <>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {type}  account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={async () => {
  await deleteUser(id)
  setIsDeleteDialogOpen(false)
  //TODO: there is a foreign key blocker here
}}
            
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {children ? (
        <div onClick={() => setIsDeleteDialogOpen(true)}>
          {children}
        </div>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="text-red-600 hover:text-red-700"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      )}
    </>
  );
}