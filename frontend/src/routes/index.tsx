import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {

    return (
        <Card className="w-[350px] m-auto mt-4">
            <CardHeader>
                <CardTitle>Resume maker</CardTitle>
                <CardDescription>Let's get you awesome resume.</CardDescription>
            </CardHeader>

            <CardContent>Hello, stranger!</CardContent>

            <CardFooter className="flex justify-between">
                <Button>Login</Button>
                <Button>Signup</Button>
            </CardFooter>
        </Card>
    );
}

export default Route;
