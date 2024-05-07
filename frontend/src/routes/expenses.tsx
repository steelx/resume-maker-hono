import {createFileRoute} from '@tanstack/react-router'
import {useGetExpensesQuery} from "@/lib/expenses";

export const Route = createFileRoute('/expenses')({
    component: Expenses
})

function Expenses() {
    const {isLoading, data} = useGetExpensesQuery({})

    return <div>
        {isLoading && (<h4>Loading...</h4>)}
        {data && (
            data.expense.map((expense) => (
                <div key={expense.id}>{expense.title} || {expense.amount}</div>
            ))
        )}
    </div>
}
