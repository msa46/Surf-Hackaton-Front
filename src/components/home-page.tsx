import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function HomePage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-6", className)} {...props}>
      <Card className="w-full max-w-xl text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            Welcome to QuantumVote
          </CardTitle>
          <CardDescription className="text-black">
            A secure, transparent, and quantum-encrypted voting experience.
          </CardDescription>
        </CardHeader>
        {/* Add the image below the CardDescription */}
        <img
          src="../assets/data/1601092.png"
          alt="QuantumVote Illustration"
          className="my-6 mx-auto w-48 h-auto"
        />
        <CardContent className="flex flex-col gap-6">
          <p className="text-sm text-black">
            Your vote is protected with cutting-edge quantum key distribution.
          </p>
          <Button className="w-full text-white bg-purple-600 hover:bg-purple-700">
            Vote Now
          </Button>
          <a
            href="/audit"
            className="text-sm text-black underline underline-offset-4 hover:text-purple-800"
          >
            View Audit Trail
          </a>
          <div className="mt-4 text-sm text-black">
            Want to know how it works?{" "}
            <a href="/about" className="underline underline-offset-4 text-black">
              Learn more
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
