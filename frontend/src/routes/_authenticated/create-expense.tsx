import {createFileRoute, redirect} from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { z } from 'zod'
import type { FieldApi } from '@tanstack/react-form'
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {usePostExpensesMutation} from "@/lib/expenses";

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}

export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense
})

function CreateExpense() {
    const [ postExpenses,  isPostExpensesProcessing ] = usePostExpensesMutation()
    const form = useForm({
        defaultValues: {
            title: '',
            amount: 0,
        },
        onSubmit: async ({ value }) => {
            await postExpenses(value)
            redirect({
                to: '/expenses'
            })
        },
        // Add a validator to support Zod usage in Form and Field
        validatorAdapter: zodValidator,
    })

    return (
        <section className="w-1/2 p-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
            >
                <aside>
                    <form.Field
                        name="title"
                        validators={{
                            onChange: z.string().trim().min(3, 'Title must be at least 3 characters'),
                            onChangeAsyncDebounceMs: 500
                        }}
                        children={(field) => {
                            // field; Avoid hasty abstractions. Render props are great!
                            return (
                                <>
                                    <Label htmlFor={field.name}>Title:</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    <FieldInfo field={field}/>
                                </>
                            )
                        }}
                    />
                </aside>

                <aside>
                    <form.Field
                        name="amount"
                        validators={{
                            onChange: z.number().positive(),
                            onChangeAsyncDebounceMs: 500
                        }}
                        children={(field) => {
                            // field; Avoid hasty abstractions. Render props are great!
                            return (
                                <>
                                    <Label htmlFor={field.name}>Amount:</Label>
                                    <Input
                                        id={field.name}
                                        name={field.name}
                                        type="number"
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(~~e.target.value)}
                                    />
                                    <FieldInfo field={field}/>
                                </>
                            )
                        }}
                    />
                </aside>

                <Button type="submit" className="mt-4" disabled={Boolean(isPostExpensesProcessing.isLoading)}>Submit</Button>
            </form>
        </section>
    )
}
