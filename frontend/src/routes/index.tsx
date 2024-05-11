import {createFileRoute} from '@tanstack/react-router'
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {useAppSelector} from "@/lib/redux-hooks";
import {selectAuthState} from "@/lib/auth/selectors";
import Profile from "@/components/profile/profile";

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  const {authenticated} = useAppSelector(selectAuthState)

  return (
    <>
      <Profile/>
      {
        !authenticated && (
          <Card className="w-[350px] m-auto mt-4">
            <CardHeader>
              <CardTitle>Resume maker</CardTitle>
              <CardDescription>Let's get you awesome resume.</CardDescription>
            </CardHeader>

            <CardContent>Hello, stranger!</CardContent>

            <CardFooter className="flex justify-between">
              <Button onClick={() => window.location.href = "/api/login"}>Login</Button>
              <Button>Signup</Button>
            </CardFooter>
          </Card>
        )
      }
    </>
  );

  return <Profile/>
}

export default Route;
