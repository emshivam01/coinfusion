import { CircleUser } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProfileHead = () => {
  return (
    <div className="px-4 py-6 flex items-center justify-between  bg-gray-200 dark:bg-[#253041] rounded-md shadow-lg">
      <div className="flex items-center gap-5">
        <CircleUser size={55} className="border " />
        <div>
          <h1 className="text-2xl font-semibold">Robert McCall</h1>
          <p className="text-base">@robertmccall</p>
        </div>
      </div>

      <Settings />
    </div>
  );
};

export default ProfileHead;

const Settings = () => {
  return (
    <Dialog>
      <DialogTrigger className=" px-3 py-1 rounded-md  dark:bg-gray-600 dark:text-blue-100 hover:bg-gray-500 dark:border-gray-600">
        Settings
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Coming Soon..</DialogTitle>
          <DialogDescription>
            This action is under development
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
