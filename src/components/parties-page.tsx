import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import React, { useState } from "react";
import { axiosInstance } from "@/routes/parties";
import type { Candidate } from "@/routes/parties";

export function PartiesPage({
  candidates,
  className,
  ...props
}: {
  candidates: Candidate[];
} & React.ComponentProps<"div">) {
  const [message, setMessage] = useState("");

  // Handle vote submission
  const handleVote = async (candidate: string) => {
    try {
      const response = await axiosInstance.post("/vote", { candidate });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Failed to register vote.");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            Political Parties
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Voting Section */}
          <div className="border p-4 rounded shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold text-black">Candidates</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-800">
              {candidates.map((candidate) => (
                <li key={candidate.id}>
                  {candidate.name}{" "}
                  <button
                    onClick={() => handleVote(candidate.name)}
                    className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Vote {candidate.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Feedback Message */}
          {message && (
            <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded">
              {message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}