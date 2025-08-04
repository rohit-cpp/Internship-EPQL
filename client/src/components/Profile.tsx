import { Loader2, Mail, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { useRef, useState, type FormEvent } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const Profile = () => {
  const loading = false;
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<string>(" ");
  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({ ...prevData, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  const updateProfileHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //   api implemetation  here
    console.log(profileData);
  };
  return (
    <div>
      <form onSubmit={updateProfileHandler} className="max-w--7xl mx-auto my-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="relative md:w-[28] md:h-[28] w-20 h-20">
              <AvatarImage
                src={selectedProfilePicture || profileData.profilePicture}
              />
              <AvatarFallback>cn</AvatarFallback>
              <input
                ref={imageRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={fileChangeHandler}
              />
              <div onClick={() => imageRef.current?.click()}>
                <div
                  className="absolute inset-0 flex items-center
            justify-center opacity-0 hover:opacity-100 cursor-pointer"
                >
                  <Plus className="text-black w-8 h-8" />
                </div>
              </div>
            </Avatar>
          </div>
        </div>

        <div className="flex flex-col md:grid-cols-4 md:gap-2 gap-3 my-10">
          <div className="flex items-center gap-4 rounded-sm p-2">
            <Mail className="text-gray-500" />
            <div className="w-full flex">
              <Label>Email</Label>
              <input
                name="email"
                value={profileData.email}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="flex">
            {" "}
            <Label>Full Name</Label>
            <input
              type="text"
              name="fullname"
              value={profileData.fullname}
              onChange={changeHandler}
              className="font-bold-2xl outline-none border-none focus-visible:ring-transparent"
            />
          </div>
          {/* <div className="flex items-center gap-4 rounded-sm p-2">
            <Mail className="text-gray-500" />
            <div className="w-full flex">
              <Label>Email</Label>
              <input
                name="email"
                value={profileData.email}
                onChange={changeHandler}
              />
            </div>
          </div> */}
          {/* <div className="flex items-center gap-4 rounded-sm p-2">
            <Mail className="text-gray-500" />
            <div className="w-full flex">
              <Label>Email</Label>
              <input
                name="email"
                value={profileData.email}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-sm p-2">
            <Mail className="text-gray-500" />
            <div className="w-full flex">
              <Label>Email</Label>
              <input
                name="email"
                value={profileData.email}
                onChange={changeHandler}
              />
            </div>
          </div> */}
        </div>
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating..
          </Button>
        ) : (
          <Button> Update</Button>
        )}
      </form>
    </div>
  );
};

export default Profile;
