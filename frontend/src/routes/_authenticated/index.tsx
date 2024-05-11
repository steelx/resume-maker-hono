import {createFileRoute} from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {useAppSelector} from "@/lib/redux-hooks.ts";
import {selectAuthState} from "@/lib/auth/selectors.ts";
import Profile from "@/components/profile/profile.tsx";
import LoginButton from "@/components/ui/LoginButton.tsx";

export const Route = createFileRoute('/_authenticated/')({
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
              <LoginButton/>
            </CardFooter>
          </Card>
        )
      }
    </>
  );
}

export default Route;
