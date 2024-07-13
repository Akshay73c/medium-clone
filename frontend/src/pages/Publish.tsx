import { Appbar } from "../componnets/Appbar";

export const Publish = () => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full">
        <div className="max-w-screen-lg w-full">
          <textarea
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Title"
          ></textarea>
        </div>
      </div>
    </div>
  );
};
