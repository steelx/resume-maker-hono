import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useGetProfileQuery} from "@/lib/auth/authApi.ts";
import {Loader} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

const Profile = () => {
  const {isLoading, data} = useGetProfileQuery({})

  if (isLoading) return <Loader/>

  if (!isLoading && data) {
    return (
      <Card className="w-[350px] m-auto mt-4">
        <CardHeader>
          <CardTitle>Hello, {data.given_name}</CardTitle>
          <CardDescription>Let's get you awesome resume.</CardDescription>
        </CardHeader>

        <CardContent>{data.email}</CardContent>

        <CardFooter className="flex justify-between">
          <Button onClick={() => window.location.href = "/api/logout"}>Logout</Button>
        </CardFooter>
      </Card>
    )
  }

  return null
}

export default Profile
