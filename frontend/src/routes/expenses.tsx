import {createFileRoute} from '@tanstack/react-router'
import {useGetExpensesQuery, useGetTotalExpensesQuery} from "@/lib/expenses";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const Route = createFileRoute('/expenses')({
    component: Expenses
})

function Expenses() {
    const {isLoading: isLoadingExpenses, data} = useGetExpensesQuery({})
    const {data: totalAmount} = useGetTotalExpensesQuery({})

    return <div>
        <Table>
            <TableCaption>A list of your recent expenses.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {isLoadingExpenses && (
                    <TableRow><TableCell colSpan={4}>...</TableCell></TableRow>
                )}
                {data && data.expenses.map((expense) => (
                    <TableRow key={expense.id}>
                        <TableCell className="font-medium">{expense.id}</TableCell>
                        <TableCell>{expense.title}</TableCell>
                        <TableCell className="text-right">{expense.amount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">{totalAmount}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </div>
}
