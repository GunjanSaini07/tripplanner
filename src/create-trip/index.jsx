import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "../constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";

function CreateTrip() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "",
    travelWith: "",
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "days" ? Number(value) : value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const GetUserProfiles = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log("User Info:", resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Google Login Success:", codeResp);
      GetUserProfiles(codeResp);
    },
    onError: (error) => console.log("Google Login Error:", error),
  });

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: TripData,
      userEmail: user.email,
      id: docId,
    });
    setLoading(false);
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData.destination ||
      !formData.budget ||
      !formData.travelWith ||
      !formData.days
    ) {
      toast("Please fill all details.");
      return;
    }

    if (formData.days > 5) {
      toast("Please enter trip days less than or equal to 5.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{destination}",
      formData.destination
    )
      .replace("{days}", formData.days)
      .replace("{travelWith}", formData.travelWith)
      .replace("{budget}", formData.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = result?.response?.text();
      console.log("AI Response:", responseText);
      setLoading(false);
      SaveAiTrip(responseText);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      toast("Failed to generate trip details. Please try again.");
    }
  };

  const searchPlaces = async (query) => {
    if (!query) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-2xl">
        Tell us about your travel preferences ⛺🌴
      </h2>
      <p className="mt-3 text-gray-500 text-lg">
        Provide some basic details, and our trip planner will create a
        personalized itinerary just for you!
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {/* Destination Selection */}
        <div>
          <h2 className="text-lg my-3 font-medium">
            What is your destination of choice?
          </h2>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for a location..."
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              handleInputChange("destination", value);
              setQuery(value);
              searchPlaces(value);
            }}
          />

          {results.length > 0 && (
            <ul className="border mt-2 rounded-md bg-white shadow-md max-h-60 overflow-y-auto">
              {results.slice(0, 5).map((place) => (
                <li
                  key={place.place_id}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    handleInputChange("destination", place.display_name);
                    setQuery(place.display_name);
                    setResults([]);
                  }}
                >
                  {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Trip Duration */}
        <div>
          <h2 className="text-lg my-3 font-medium">
            How many days will your trip be?
          </h2>
          <Input
            placeholder="Enter number of days"
            type="number"
            value={formData.days}
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className="text-lg my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData.budget === item.title ? "border-blue-500" : ""
                }`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Travel Companion Selection */}
      <div>
        <h2 className="text-lg my-3 font-medium">
          Who will be joining you on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData.travelWith === item.title ? "border-blue-500" : ""
              }`}
              onClick={() => handleInputChange("travelWith", item.title)}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/*generate trip button*/}
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img
                src="logo.svg"
                style={{ width: "110px", height: "auto", marginLeft: -23 }}
              />
              <h2 className="font-bold text-lg">Sign in With Google</h2>
              <p>Sign in to the App with a Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
