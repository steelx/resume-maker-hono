import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { serverApi } from "@/lib/api";
export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
    const [totalSpent, setTotalSpent] = useState(0);

    const fetchTotalSpent = async () => {
        const response = await serverApi.expenses["total"].$get();
        const data = await response.json();
        setTotalSpent(data.total);
    };

    useEffect(() => {
        fetchTotalSpent();
    }, []);

    return (
        <Card className="w-[350px] m-auto">
            <CardHeader>
                <CardTitle>Expenses</CardTitle>
                <CardDescription>Total amount you've spent.</CardDescription>
            </CardHeader>

            <CardContent>{totalSpent}</CardContent>

            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => setTotalSpent(totalSpent + 1)}>Deploy</Button>
            </CardFooter>
        </Card>
    );
}

export default Route;
